import axios from 'axios'

const OPENWEATHER_KEY = process.env.OPENWEATHER_API_KEY
const OPENWEATHER_BASE = 'https://api.openweathermap.org'

/**
 * Calculate US EPA AQI from PM2.5 concentration (μg/m³)
 */
function calculateAQIFromPM25(pm25) {
  const breakpoints = [
    { cLow: 0.0, cHigh: 12.0, aqiLow: 0, aqiHigh: 50 },
    { cLow: 12.1, cHigh: 35.4, aqiLow: 51, aqiHigh: 100 },
    { cLow: 35.5, cHigh: 55.4, aqiLow: 101, aqiHigh: 150 },
    { cLow: 55.5, cHigh: 150.4, aqiLow: 151, aqiHigh: 200 },
    { cLow: 150.5, cHigh: 250.4, aqiLow: 201, aqiHigh: 300 },
    { cLow: 250.5, cHigh: 350.4, aqiLow: 301, aqiHigh: 400 },
    { cLow: 350.5, cHigh: 500.4, aqiLow: 401, aqiHigh: 500 },
  ]

  for (const bp of breakpoints) {
    if (pm25 >= bp.cLow && pm25 <= bp.cHigh) {
      const aqi = ((bp.aqiHigh - bp.aqiLow) / (bp.cHigh - bp.cLow)) * (pm25 - bp.cLow) + bp.aqiLow
      return Math.round(aqi)
    }
  }

  if (pm25 > 500.4) return 500
  return 0
}

/**
 * Calculate AQI from PM10 concentration (μg/m³)
 */
function calculateAQIFromPM10(pm10) {
  const breakpoints = [
    { cLow: 0, cHigh: 54, aqiLow: 0, aqiHigh: 50 },
    { cLow: 55, cHigh: 154, aqiLow: 51, aqiHigh: 100 },
    { cLow: 155, cHigh: 254, aqiLow: 101, aqiHigh: 150 },
    { cLow: 255, cHigh: 354, aqiLow: 151, aqiHigh: 200 },
    { cLow: 355, cHigh: 424, aqiLow: 201, aqiHigh: 300 },
    { cLow: 425, cHigh: 504, aqiLow: 301, aqiHigh: 400 },
    { cLow: 505, cHigh: 604, aqiLow: 401, aqiHigh: 500 },
  ]

  for (const bp of breakpoints) {
    if (pm10 >= bp.cLow && pm10 <= bp.cHigh) {
      const aqi = ((bp.aqiHigh - bp.aqiLow) / (bp.cHigh - bp.cLow)) * (pm10 - bp.cLow) + bp.aqiLow
      return Math.round(aqi)
    }
  }

  if (pm10 > 604) return 500
  return 0
}

/**
 * GET /api/aqi/current
 * Query params: lat, lon
 * Returns current air quality data for coordinates
 */
export async function getCurrentAQI(req, res, next) {
  try {
    const { lat, lon } = req.query

    if (!lat || !lon) {
      return res.status(400).json({ error: 'lat and lon are required' })
    }

    const { data } = await axios.get(`${OPENWEATHER_BASE}/data/2.5/air_pollution`, {
      params: {
        lat: parseFloat(lat),
        lon: parseFloat(lon),
        appid: OPENWEATHER_KEY,
      },
    })

    const pollution = data.list[0]
    
    // Calculate AQI from PM2.5 (primary pollutant)
    const pm25AQI = calculateAQIFromPM25(pollution.components.pm2_5)
    const pm10AQI = calculateAQIFromPM10(pollution.components.pm10)
    
    // Use the higher of the two as overall AQI
    const overallAQI = Math.max(pm25AQI, pm10AQI)
    
    res.json({
      aqi: overallAQI,
      city: 'Location',
      station: {
        name: 'OpenWeatherMap Station',
        lat: parseFloat(lat),
        lon: parseFloat(lon),
      },
      components: {
        pm2_5: pollution.components.pm2_5,
        pm10: pollution.components.pm10,
        o3: pollution.components.o3,
        no2: pollution.components.no2,
        so2: pollution.components.so2,
        co: pollution.components.co,
      },
      componentAQI: {
        pm2_5: pm25AQI,
        pm10: pm10AQI,
      },
      dominantPollutant: pm25AQI > pm10AQI ? 'pm25' : 'pm10',
      timestamp: pollution.dt,
      coordinates: { 
        lat: parseFloat(lat), 
        lon: parseFloat(lon) 
      },
    })
  } catch (err) {
    console.error('[AQI Error]', err.message)
    next(err)
  }
}

/**
 * GET /api/aqi/nearby
 * Query params: lat, lon
 * Returns nearby monitoring stations (not available with OpenWeatherMap)
 */
export async function getNearbyStations(req, res, next) {
  try {
    res.json({ stations: [] })
  } catch (err) {
    console.error('[Nearby Stations Error]', err.message)
    res.json({ stations: [] })
  }
}

/**
 * GET /api/aqi/forecast
 * Query params: lat, lon
 * Returns 5-day air quality forecast
 */
export async function getAQIForecast(req, res, next) {
  try {
    const { lat, lon } = req.query

    if (!lat || !lon) {
      return res.status(400).json({ error: 'lat and lon are required' })
    }

    const { data } = await axios.get(`${OPENWEATHER_BASE}/data/2.5/air_pollution/forecast`, {
      params: {
        lat: parseFloat(lat),
        lon: parseFloat(lon),
        appid: OPENWEATHER_KEY,
      },
    })

    const forecast = data.list.map(item => {
      const pm25AQI = calculateAQIFromPM25(item.components.pm2_5)
      const pm10AQI = calculateAQIFromPM10(item.components.pm10)
      
      return {
        aqi: Math.max(pm25AQI, pm10AQI),
        components: item.components,
        timestamp: item.dt,
      }
    })

    res.json({
      forecast,
      coordinates: { lat: parseFloat(lat), lon: parseFloat(lon) },
    })
  } catch (err) {
    console.error('[AQI Forecast Error]', err.message)
    next(err)
  }
}

/**
 * GET /api/aqi/history
 * Query params: lat, lon
 * Returns historical air quality data using forecast data
 */
export async function getAQIHistory(req, res, next) {
  try {
    const { lat, lon, start, end } = req.query

    if (!lat || !lon) {
      return res.status(400).json({ error: 'lat and lon are required' })
    }

    // Default to last 7 days
    const endTime = end ? parseInt(end) : Math.floor(Date.now() / 1000)
    const startTime = start ? parseInt(start) : endTime - (7 * 24 * 60 * 60)

    const { data } = await axios.get(`${OPENWEATHER_BASE}/data/2.5/air_pollution/history`, {
      params: {
        lat: parseFloat(lat),
        lon: parseFloat(lon),
        start: startTime,
        end: endTime,
        appid: OPENWEATHER_KEY,
      },
    })

    const history = data.list.map(item => {
      const pm25AQI = calculateAQIFromPM25(item.components.pm2_5)
      const pm10AQI = calculateAQIFromPM10(item.components.pm10)
      
      return {
        aqi: Math.max(pm25AQI, pm10AQI),
        components: item.components,
        timestamp: item.dt,
      }
    })

    res.json({
      history,
      coordinates: { lat: parseFloat(lat), lon: parseFloat(lon) },
      period: { start: startTime, end: endTime },
    })
  } catch (err) {
    console.error('[AQI History Error]', err.message)
    next(err)
  }
}

/**
 * GET /api/aqi/geocode
 * Query params: city
 * Returns coordinates for a city name
 */
export async function geocodeCity(req, res, next) {
  try {
    const { city } = req.query

    if (!city) {
      return res.status(400).json({ error: 'city is required' })
    }

    const { data } = await axios.get(`${OPENWEATHER_BASE}/geo/1.0/direct`, {
      params: {
        q: city,
        limit: 5,
        appid: OPENWEATHER_KEY,
      },
    })

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'City not found' })
    }

    const results = data.map(item => ({
      name: item.name,
      country: item.country,
      state: item.state,
      lat: item.lat,
      lon: item.lon,
    }))

    res.json({ results })
  } catch (err) {
    console.error('[Geocode Error]', err.message)
    next(err)
  }
}
