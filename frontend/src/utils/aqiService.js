import apiClient from '@utils/apiClient'

/**
 * Get current AQI for coordinates
 */
export async function fetchCurrentAQI(lat, lon) {
  const { data } = await apiClient.get('/aqi/current', {
    params: { lat, lon },
  })
  return data
}

/**
 * Get AQI forecast for coordinates
 */
export async function fetchAQIForecast(lat, lon) {
  const { data } = await apiClient.get('/aqi/forecast', {
    params: { lat, lon },
  })
  return data
}

/**
 * Get historical AQI data
 */
export async function fetchAQIHistory(lat, lon, start, end) {
  const { data } = await apiClient.get('/aqi/history', {
    params: { lat, lon, start, end },
  })
  return data
}

/**
 * Geocode city name to coordinates
 */
export async function geocodeCity(city) {
  const { data } = await apiClient.get('/aqi/geocode', {
    params: { city },
  })
  return data
}

/**
 * Get AQI level label and color based on US EPA standard (0-500 scale)
 */
export function getAQILevel(aqi) {
  if (aqi <= 50) {
    return { label: 'Good', color: 'green', bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' }
  } else if (aqi <= 100) {
    return { label: 'Moderate', color: 'yellow', bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-500' }
  } else if (aqi <= 150) {
    return { label: 'Unhealthy for Sensitive Groups', color: 'orange', bg: 'bg-orange-100', text: 'text-orange-800', dot: 'bg-orange-500' }
  } else if (aqi <= 200) {
    return { label: 'Unhealthy', color: 'red', bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500' }
  } else if (aqi <= 300) {
    return { label: 'Very Unhealthy', color: 'purple', bg: 'bg-purple-100', text: 'text-purple-800', dot: 'bg-purple-500' }
  } else {
    return { label: 'Hazardous', color: 'maroon', bg: 'bg-red-200', text: 'text-red-900', dot: 'bg-red-700' }
  }
}

/**
 * Get pollutant info
 */
export function getPollutantInfo(pollutant) {
  const info = {
    pm2_5: { name: 'PM2.5', unit: 'μg/m³', desc: 'Fine particles' },
    pm10: { name: 'PM10', unit: 'μg/m³', desc: 'Coarse particles' },
    o3: { name: 'O₃', unit: 'μg/m³', desc: 'Ozone' },
    no2: { name: 'NO₂', unit: 'μg/m³', desc: 'Nitrogen dioxide' },
    so2: { name: 'SO₂', unit: 'μg/m³', desc: 'Sulfur dioxide' },
    co: { name: 'CO', unit: 'μg/m³', desc: 'Carbon monoxide' },
  }
  return info[pollutant] || { name: pollutant, unit: 'μg/m³', desc: '' }
}
