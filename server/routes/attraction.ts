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
  } catch (error) {
    console.error('Error getting access token:', error)
    throw new Error('Failed to get access token')
  }
}

const fetchActivitiesForLocation = async (lat: string, lon: string) => {
  const apiUrl = `https://api.amadeus.com/v1/shopping/activities?latitude=${lat}&longitude=${lon}&radius=50000&limit=50` // Adjust limit as needed
  try {
    const response = await request
      .get(apiUrl)
      .set('Authorization', `Bearer ${accessToken}`)
    return response.body.data || []
  } catch (error) {
    console.error(`Error fetching activities for ${lat}, ${lon}:`, error)
    throw new Error('Failed to fetch activities')
  }
}

router.get('/random-activities', async (req, res) => {
  const locations = [
    { lat: '48.8566', lon: '2.3522', name: 'Paris' },
    // { lat: '40.7128', lon: '-74.0060', name: 'New York' },
    { lat: '41.6895', lon: '2.1620', name: 'Barcelona' },
    { lat: '13.0236', lon: '77.6423', name: 'Bangalore' },
    { lat: '52.5418', lon: '13.4572', name: 'Berlin' },
    { lat: '32.8070', lon: '-96.7373', name: 'Dallas' },
    // { lat: '51.5201', lon: '-0.06105', name: 'London' },
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
      .slice(0, 16) // Get the top 20 highest-rated activities with images

    res.json(filteredActivities)
  } catch (error) {
    console.error('Error fetching highest-rated activities:', error)
    res.status(500).json({ error: 'Failed to fetch highest-rated activities' })
  }
})

export default router
