import express from 'express'
import request from 'superagent'
import dotenv from 'dotenv'

dotenv.config()
const router = express.Router()

const API_KEY = process.env.API_KEY
const API_SECRET = process.env.API_SECRET

let accessToken = ''

interface Activity {
  id: number
  name: string
  pictures?: { url: string }[]
  rating?: number
}

// Function to fetch access token
const getAccessToken = async () => {
  try {
    const response = await request
      .post('https://api.amadeus.com/v1/security/oauth2/token')
      .type('form')
      .send({
        grant_type: 'client_credentials',
        client_id: API_KEY,
        client_secret: API_SECRET,
      })
    accessToken = response.body.access_token
    //console.log('Access token fetched:', accessToken) // Debugging log
  } catch (error) {
    console.error('Error getting access token:', error)
    throw new Error('Failed to get access token')
  }
}

// Function to fetch activities for a specific location
const fetchActivitiesForLocation = async (lat: string, lon: string) => {
  const apiUrl = `https://api.amadeus.com/v1/shopping/activities?latitude=${lat}&longitude=${lon}&radius=50000&limit=50`
  try {
    const response = await request
      .get(apiUrl)
      .set('Authorization', `Bearer ${accessToken}`)
    //console.log('Activities fetched for location:', response.body) // Debugging log
    return response.body.data || []
  } catch (error) {
    console.error(`Error fetching activities for ${lat}, ${lon}:`, error)
    throw new Error('Failed to fetch activities')
  }
}

// Function to fetch city coordinates by city name
const fetchCityCoordinates = async (cityName: string) => {
  const apiUrl = `https://api.amadeus.com/v1/reference-data/locations/cities?keyword=${cityName}&max=1`
  try {
    const response = await request
      .get(apiUrl)
      .set('Authorization', `Bearer ${accessToken}`)
    //console.log('City coordinates fetched:', response.body) // Debugging log
    const cityData = response.body.data[0]
    return { lat: cityData.geoCode.latitude, lon: cityData.geoCode.longitude }
  } catch (error) {
    console.error(`Error fetching coordinates for city ${cityName}:`, error)
    throw new Error('Failed to fetch city coordinates')
  }
}

// Route to get activities for a specific city
router.get('/activities-by-city', async (req, res) => {
  const cityName = req.query.content as string // Get city name from query parameters
console.log('search nameeeeee',cityName)
  if (!cityName) {
    return res.status(400).json({ error: 'City name is required' })
  }

  try {
    await getAccessToken()
    const { lat, lon } = await fetchCityCoordinates(cityName)
    const activities: Activity[] = await fetchActivitiesForLocation(lat, lon)

    const filteredActivities = activities
      .filter(
        (activity: Activity) =>
          activity.pictures && activity.pictures.length > 0, // Ensure there are images
      )
      .sort((a: Activity, b: Activity) => (b.rating || 0) - (a.rating || 0)) // Sort by rating, descending
      .slice(0, 16) // Get the top 16 highest-rated activities with images

    res.json(filteredActivities)
  } catch (error) {
    console.error('Error fetching activities for city:', error)
    res.status(500).json({ error: 'Failed to fetch activities for city' })
  }
})

// Existing route for random activities
router.get('/random-activities', async (req, res) => {
  const locations = [
    { lat: '13.0236', lon: '77.6423', name: 'Bangalore' },
    { lat: '52.5418', lon: '13.4572', name: 'Berlin' },
    { lat: '32.8070', lon: '-96.7373', name: 'Dallas' },
    { lat: '37.8109', lon: '-122.3700', name: 'San Francisco' },
  ]

  const randomIndex = Math.floor(Math.random() * locations.length)
  const selectedLocation = locations[randomIndex]

  try {
    await getAccessToken()
    const activities: Activity[] = await fetchActivitiesForLocation(
      selectedLocation.lat,
      selectedLocation.lon,
    )

    const filteredActivities = activities
      .filter(
        (activity: Activity) =>
          activity.pictures && activity.pictures.length > 0, // Ensure there are images
      )
      .sort((a: Activity, b: Activity) => (b.rating || 0) - (a.rating || 0)) // Sort by rating, descending
      .slice(0, 16) // Get the top 16 highest-rated activities with images

    res.json(filteredActivities)
    console.log('route return data',filteredActivities)
  } catch (error) {
    console.error('Error fetching highest-rated activities:', error)
    res.status(500).json({ error: 'Failed to fetch highest-rated activities' })
  }
})

export default router
