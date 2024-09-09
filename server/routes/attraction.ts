import express from 'express'
import request from 'superagent'
import dotenv from 'dotenv'
import * as db from '../db/attractions'
// import request from 'superagent'

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

const fetchActivitiesForLocation = async (lat: string, lon: string) => {
  const response = await request
    .get('https://test.api.amadeus.com/v1/shopping/activities')
    .query({
      latitude: lat,
      longitude: lon,
      radius: 50000,
      limit: 50,
    })
    .set('Authorization', `Bearer ${accessToken}`)
  //console.log(`Activities Response for ${lat}, ${lon}:`, response.body)
  return response.body.data || []
}

router.get('/random-activities', async (req, res) => {
  const locations = [
    { lat: '48.8566', lon: '2.3522' }, // Paris
    { lat: '40.7128', lon: '-74.0060' }, // New York
    { lat: '41.6895', lon: '2.1620' }, // Barcelona
  ]

  const TOTAL_MAX_ACTIVITIES = 20

  try {
    await getAccessToken()

    const activitiesPromises = locations.map(async (location) => {
      try {
        const activities = await fetchActivitiesForLocation(
          location.lat,
          location.lon,
        )
        return activities
      } catch (error) {
        console.error(
          `Error fetching activities for location ${location.lat}, ${location.lon}:`,
          error,
        )
        return [] // Return empty array on error
      }
    })

    const activitiesResults = await Promise.all(activitiesPromises)
    const allActivities = activitiesResults.flat()

    // Filter for attractions with images
    const activitiesWithImages = allActivities.filter(
      (activity) => activity.pictures && activity.pictures.length > 0,
    )

    // Sort by rating in descending order
    const sortedActivities = activitiesWithImages.sort(
      (a, b) => (b.rating || 0) - (a.rating || 0),
    )

    // Limit the number of activities to return
    const limitedActivities = sortedActivities.slice(0, TOTAL_MAX_ACTIVITIES)
    
    res.json(limitedActivities)
  } catch (error) {
    console.error('Error in /random-activities route:', error)
    res.status(500).json({ error: 'Failed to fetch random activities' })
  }
})
router.post('/', async (req, res) => {
  const { attraction, trip_id } = req.body
  try {
    await db.addAttraction(attraction, trip_id)
    res.json({ message: 'attraction has been added' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attraction data' })
  }
})
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const attractionId = Number(id)

  try {
    await db.deleteAttractionById(attractionId)
    res.json({ message: 'attraction has been delete' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attraction data' })
  }
})

export default router
