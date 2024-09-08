import express from 'express'
// import request from 'superagent'
import request from 'superagent'
import dotenv from 'dotenv'
// import Amadeus from 'amadeus'

dotenv.config()
const router = express.Router()

const API_KEY = process.env.API_KEY
const API_SECRET = process.env.API_SECRET

let accessToken = ''

const getAccessToken = async () => {
  const response = await request
    .post('https://test.api.amadeus.com/v1/security/oauth2/token')
    .type('form')
    .send({
      grant_type: 'client_credentials',
      client_id: API_KEY,
      client_secret: API_SECRET,
    })
  accessToken = response.body.access_token
}

const fetchActivitiesForLocation = async (lat, lon) => {
  const apiUrl = `https://test.api.amadeus.com/v1/shopping/activities?latitude=${lat}&longitude=${lon}&radius=50000&limit=10`
  const response = await request
    .get(apiUrl)
    .set('Authorization', `Bearer ${accessToken}`)
  console.log(`Activities Response for ${lat}, ${lon}:`, response.body)
  return response.body.data || []
}

router.get('/random-activities', async (req, res) => {
  const locations = [
    { lat: '48.8566', lon: '2.3522' }, // Paris
    { lat: '40.7128', lon: '-74.0060' }, // New York
    { lat: '41.6895', lon: '2.1620' }, // Barcelona
  ]

  const TOTAL_MAX_ACTIVITIES = 15

  try {
    // Get access token for Amadeus API
    await getAccessToken()

    // Fetch activities from all locations
    const activitiesPromises = locations.map(async (location) => {
      const activities = await fetchActivitiesForLocation(
        location.lat,
        location.lon,
      )
      return activities
    })

    // Wait for all activities to be fetched
    const activitiesResults = await Promise.all(activitiesPromises)

    // Flatten the results
    const allActivities = activitiesResults.flat()

    // Filter by activities that have an image URL and a rating
    const filteredByImageAndRating = allActivities
      .filter(
        (activity) =>
          activity.picture && activity.picture[0] && activity.rating,
      ) // Ensure the activity has an image and a rating
      .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating)) // Sort by rating (descending)

    // Limit the number of activities to return
    const limitedActivities = filteredByImageAndRating.slice(
      0,
      TOTAL_MAX_ACTIVITIES,
    )

    res.json(limitedActivities)
  } catch (error) {
    console.error('Error fetching random activities:', error)
    res.status(500).json({ error: 'Failed to fetch random activities' })
  }
})

export default router
