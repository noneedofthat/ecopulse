import { useState, useEffect, useRef } from 'react'
import { Wind, MapPin, Search, Loader2, AlertCircle, RefreshCw } from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents, CircleMarker } from 'react-leaflet'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { fetchCurrentAQI, fetchAQIHistory, geocodeCity, getAQILevel, getPollutantInfo } from '@utils/aqiService'
import apiClient from '@utils/apiClient'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix Leaflet default marker icon
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Component to update map center
function MapUpdater({ center, zoom }) {
  const map = useMap()
  
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.5 })
  }, [center, zoom, map])
  
  return null
}

// Map click handler component
function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
}

export default function AQIPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentData, setCurrentData] = useState(null)
  const [historyData, setHistoryData] = useState([])
  const [nearbyStations, setNearbyStations] = useState([])
  const [mapCenter, setMapCenter] = useState([28.6139, 77.2090]) // Default: New Delhi
  const [mapZoom, setMapZoom] = useState(10)
  const [lastUpdate, setLastUpdate] = useState(null)
  const refreshIntervalRef = useRef(null)

  // Fetch AQI data for coordinates
  async function fetchAQIData(lat, lon) {
    try {
      setLoading(true)
      setError(null)

      // Fetch current and historical data
      const [current, history] = await Promise.all([
        fetchCurrentAQI(lat, lon),
        fetchAQIHistory(lat, lon),
      ])

      setCurrentData(current)
      
      // Process history data for chart
      const dailyData = processHistoryData(history.history)
      setHistoryData(dailyData)
      
      // Fetch nearby stations (non-blocking)
      try {
        const nearbyResponse = await apiClient.get(`/aqi/nearby?lat=${lat}&lon=${lon}`)
        setNearbyStations(nearbyResponse.data.stations || [])
      } catch (err) {
        console.warn('Could not fetch nearby stations:', err)
        setNearbyStations([])
      }
      
      setLastUpdate(new Date())
      setLoading(false)
    } catch (err) {
      console.error('AQI fetch error:', err)
      setError(err.response?.data?.error || err.message || 'Failed to fetch AQI data')
      setLoading(false)
    }
  }

  // Process history data into daily averages
  function processHistoryData(history) {
    if (!history || history.length === 0) return []

    const dailyMap = {}
    
    history.forEach(item => {
      const date = new Date(item.timestamp * 1000)
      const dateKey = date.toISOString().split('T')[0]
      
      if (!dailyMap[dateKey]) {
        dailyMap[dateKey] = { date: dateKey, values: [], pm25: [], pm10: [] }
      }
      
      dailyMap[dateKey].values.push(item.aqi)
      dailyMap[dateKey].pm25.push(item.components.pm2_5)
      dailyMap[dateKey].pm10.push(item.components.pm10)
    })

    return Object.values(dailyMap)
      .map(day => ({
        date: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        aqi: Math.round(day.values.reduce((a, b) => a + b, 0) / day.values.length),
        pm25: Math.round(day.pm25.reduce((a, b) => a + b, 0) / day.pm25.length),
        pm10: Math.round(day.pm10.reduce((a, b) => a + b, 0) / day.pm10.length),
      }))
      .slice(-7) // Last 7 days
  }

  // Handle search
  async function handleSearch(e) {
    e.preventDefault()
    if (!searchQuery.trim()) return

    try {
      setLoading(true)
      setError(null)

      const result = await geocodeCity(searchQuery)
      
      if (result.results && result.results.length > 0) {
        const location = result.results[0]
        
        // Validate coordinates
        if (!location.lat || !location.lon) {
          setError('Invalid location data received')
          setLoading(false)
          return
        }
        
        const newLat = parseFloat(location.lat)
        const newLon = parseFloat(location.lon)
        
        // Update map center first
        setMapCenter([newLat, newLon])
        setMapZoom(12)
        
        // Then fetch AQI for this location
        await fetchAQIData(newLat, newLon)
      } else {
        setError('City not found. Try searching for a major city nearby.')
        setLoading(false)
      }
    } catch (err) {
      // Only log unexpected errors (not 404 city not found)
      if (err.response?.status !== 404) {
        console.error('Search error:', err)
      }
      setError(err.response?.data?.error || 'Failed to search city. Try a different city name.')
      setLoading(false)
    }
  }

  // Handle map click
  async function handleMapClick(lat, lon) {
    try {
      setMapCenter([lat, lon])
      setMapZoom(12)
      await fetchAQIData(lat, lon)
    } catch (err) {
      // Don't log 404 errors (location not found), only unexpected errors
      if (err.response?.status !== 404) {
        console.error('Map click error:', err)
      }
      // Don't show error for map clicks, just silently fail
    }
  }

  // Auto-refresh every 5 minutes
  useEffect(() => {
    // Initial load with default location
    fetchAQIData(mapCenter[0], mapCenter[1])

    // Set up auto-refresh
    refreshIntervalRef.current = setInterval(() => {
      if (currentData) {
        fetchAQIData(currentData.coordinates.lat, currentData.coordinates.lon)
      }
    }, 5 * 60 * 1000) // 5 minutes

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current)
      }
    }
  }, [])

  // Manual refresh
  function handleRefresh() {
    if (currentData) {
      fetchAQIData(currentData.coordinates.lat, currentData.coordinates.lon)
    }
  }

  const aqiLevel = currentData ? getAQILevel(currentData.aqi) : null

  // Get color for AQI circle marker (using US EPA scale)
  function getAQIColor(aqi) {
    if (aqi <= 50) return '#10b981' // green - Good
    if (aqi <= 100) return '#eab308' // yellow - Moderate
    if (aqi <= 150) return '#f97316' // orange - Unhealthy for Sensitive
    if (aqi <= 200) return '#ef4444' // red - Unhealthy
    if (aqi <= 300) return '#a855f7' // purple - Very Unhealthy
    return '#7f1d1d' // maroon - Hazardous
  }

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <section className="bg-forest-900 text-white py-12">
        <div className="page-container">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-forest-700 flex items-center justify-center">
              <Wind size={20} className="text-forest-300" />
            </div>
            <span className="badge bg-forest-700/60 text-forest-200 text-xs">Live Data</span>
          </div>
          <h1 className="section-title text-white mb-2">Air Quality Index</h1>
          <p className="text-forest-300 max-w-xl">
            Search any city worldwide to get real-time AQI readings, pollutant
            breakdowns, and historical air quality trends.
          </p>
        </div>
      </section>

      <div className="page-container py-10">

        {/* Search bar */}
        <form onSubmit={handleSearch} className="max-w-xl mb-8">
          <label className="block text-sm font-medium text-forest-700 mb-2">
            Search a city
          </label>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-forest-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter city name (e.g., Mumbai, London, Tokyo)"
                className="input-base pl-10"
              />
            </div>
            <button 
              type="submit" 
              className="btn-primary px-5 gap-2"
              disabled={loading}
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
              Search
            </button>
          </div>
        </form>

        {/* Error message */}
        {error && (
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 mb-6">
            <AlertCircle size={20} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Current AQI Summary */}
        {currentData && aqiLevel && (
          <div className="card p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-display text-xl font-bold text-forest-900">Current Air Quality</h2>
                <p className="text-xs text-forest-500 mt-1">
                  Station: {currentData.station?.name || currentData.city}
                </p>
              </div>
              <button
                onClick={handleRefresh}
                className="btn-ghost p-2"
                title="Refresh data"
              >
                <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              </button>
            </div>
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${aqiLevel.bg}`}>
                  <span className={`w-3 h-3 rounded-full ${aqiLevel.dot}`} />
                  <span className={`font-semibold ${aqiLevel.text}`}>{aqiLevel.label}</span>
                </div>
                <p className="text-sm text-forest-500 mt-2">
                  Last updated: {lastUpdate?.toLocaleTimeString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-5xl font-display font-bold text-forest-900">{currentData.aqi}</p>
                <p className="text-sm text-forest-500">US EPA AQI</p>
                {currentData.dominantPollutant && (
                  <p className="text-xs text-forest-400 mt-1">
                    Main: {currentData.dominantPollutant.toUpperCase()}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Interactive Map */}
        <div className="card mb-8 overflow-hidden">
          <div className="h-72 md:h-96">
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapUpdater center={mapCenter} zoom={mapZoom} />
              
              {/* Main station marker */}
              {currentData && (
                <>
                  <CircleMarker
                    center={[currentData.station?.lat || currentData.coordinates.lat, currentData.station?.lon || currentData.coordinates.lon]}
                    radius={25}
                    fillColor={getAQIColor(currentData.aqi)}
                    fillOpacity={0.7}
                    color={getAQIColor(currentData.aqi)}
                    weight={3}
                  >
                    <Popup>
                      <div className="text-center p-2">
                        <p className="font-bold text-sm mb-1">{currentData.station?.name || currentData.city}</p>
                        <p className="font-bold text-2xl">{currentData.aqi}</p>
                        <p className="text-sm font-semibold">{aqiLevel?.label}</p>
                        <p className="text-xs text-gray-600 mt-1">
                          PM2.5: {currentData.components.pm2_5}
                        </p>
                      </div>
                    </Popup>
                  </CircleMarker>
                  <Marker position={[currentData.station?.lat || currentData.coordinates.lat, currentData.station?.lon || currentData.coordinates.lon]} />
                </>
              )}
              
              {/* Nearby stations */}
              {nearbyStations.map((station, idx) => {
                const stationLevel = getAQILevel(station.aqi)
                return (
                  <CircleMarker
                    key={idx}
                    center={[station.lat, station.lon]}
                    radius={15}
                    fillColor={getAQIColor(station.aqi)}
                    fillOpacity={0.5}
                    color={getAQIColor(station.aqi)}
                    weight={2}
                    eventHandlers={{
                      click: () => {
                        setMapCenter([station.lat, station.lon])
                        fetchAQIData(station.lat, station.lon)
                      },
                    }}
                  >
                    <Popup>
                      <div className="text-center p-2">
                        <p className="font-bold text-xs mb-1">{station.name}</p>
                        <p className="font-bold text-lg">{station.aqi}</p>
                        <p className="text-xs font-semibold">{stationLevel.label}</p>
                      </div>
                    </Popup>
                  </CircleMarker>
                )
              })}
              
              <MapClickHandler onMapClick={handleMapClick} />
            </MapContainer>
          </div>
          <div className="p-3 bg-forest-50 border-t border-forest-100">
            <p className="text-xs text-forest-600 flex items-center gap-2">
              <MapPin size={12} />
              Click anywhere on the map or on a station marker to get AQI for that location
            </p>
          </div>
        </div>

        {/* Pollutant Cards */}
        {currentData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {Object.entries(currentData.components)
              .filter(([key, value]) => value > 0) // Only show pollutants with data
              .map(([key, value]) => {
                const info = getPollutantInfo(key)
                
                // Get AQI level based on pollutant-specific thresholds
                let level = aqiLevel
                if (key === 'pm2_5') {
                  if (value <= 12) level = getAQILevel(25)
                  else if (value <= 35.4) level = getAQILevel(75)
                  else if (value <= 55.4) level = getAQILevel(125)
                  else if (value <= 150.4) level = getAQILevel(175)
                  else level = getAQILevel(250)
                } else if (key === 'pm10') {
                  if (value <= 54) level = getAQILevel(25)
                  else if (value <= 154) level = getAQILevel(75)
                  else if (value <= 254) level = getAQILevel(125)
                  else level = getAQILevel(175)
                }
                
                const percentage = Math.min((value / 100) * 100, 100)
                
                return (
                  <div key={key} className="card p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-sm font-medium text-forest-700">{info.name}</span>
                        <p className="text-xs text-forest-400">{info.desc}</p>
                      </div>
                      <span className={`badge ${level.bg} ${level.text} text-xs`}>{level.label}</span>
                    </div>
                    <div className="h-2 bg-forest-100 rounded-full mb-3">
                      <div 
                        className={`h-2 rounded-full ${level.dot}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <p className="text-2xl font-display font-bold text-forest-900">{value.toFixed(1)}</p>
                    <p className="text-xs text-forest-400 mt-1">{info.unit}</p>
                  </div>
                )
              })}
          </div>
        )}

        {/* Historical Chart */}
        {historyData.length > 0 && (
          <div className="card p-6">
            <h2 className="font-display text-lg font-bold text-forest-900 mb-4">
              7-Day AQI Trend
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={historyData}>
                <defs>
                  <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#52b788" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#52b788" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#d8f3dc" />
                <XAxis 
                  dataKey="date" 
                  stroke="#74c69d"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#74c69d"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #d8f3dc',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="aqi" 
                  stroke="#2d6a4f" 
                  fillOpacity={1} 
                  fill="url(#colorAqi)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {!currentData && !loading && (
          <p className="flex items-center gap-2 text-forest-400 text-sm mt-6 justify-center">
            <AlertCircle size={14} />
            Search for a city or click on the map to view air quality data
          </p>
        )}
      </div>
    </div>
  )
}
