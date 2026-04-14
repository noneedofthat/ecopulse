/**
 * /api/aqi
 * Implemented in Increment 5 — OpenWeatherMap integration
 */
import { Router } from 'express'
import {
  getCurrentAQI,
  getNearbyStations,
  getAQIForecast,
  getAQIHistory,
  geocodeCity,
} from '../controllers/aqiController.js'

const router = Router()

router.get('/current', getCurrentAQI)
router.get('/nearby', getNearbyStations)
router.get('/forecast', getAQIForecast)
router.get('/history', getAQIHistory)
router.get('/geocode', geocodeCity)

export default router
