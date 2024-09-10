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
  try {
    const response = await request
      .get('https://api.amadeus.com/v1/shopping/activities')
      .query({
        latitude: lat,
        longitude: lon,
        radius: 50000,
        limit: 50,
      })
      .set('Authorization', `Bearer ${accessToken}`)
    //console.log(`Activities Response for ${lat}, ${lon}:`, response.body)
    return response.body.data || []
  } catch (error) {
    console.error(`Error fetching activities for ${lat}, ${lon}:`, error)
    throw new Error('Failed to fetch activities')
  }
}

const fetchActivityById = async (id: string) => {
  console.log('this is the id', id)
  console.log('this is the access token', accessToken)

  try {
    const response = await request
      .get(`https://api.amadeus.com/v1/reference-data/locations/pois/${id}`)
      .set('Authorization', `Bearer ${accessToken}`)
    console.log(`Activities Response for attraction id: ${id}`, response.body)
    return response.body.data || []
  } catch (error) {
    console.error(`Error fetching activities by id`, id, error)
    throw new Error('Failed to fetch activities')
  }
}

const fetchCityCoordinates = async (cityName: string) => {
  const apiUrl = `https://api.amadeus.com/v1/reference-data/locations/cities?keyword=${cityName}&max=1`
  try {
    const response = await request
      .get(apiUrl)
      .set('Authorization', `Bearer ${accessToken}`)
    // console.log('City coordinates fetched:', response.body) // Debugging log
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

router.get('/activities-by-id', async (req, res) => {
  const { attraction_id } = req.body
  console.log('attraction_id', attraction_id)
  await getAccessToken()
  try {
    await fetchActivityById(attraction_id)
    res.json({ message: 'found attraction by id' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attraction by id data' })
  }
})

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
  } catch (error) {
    console.error('Error fetching highest-rated activities:', error)
    res.status(500).json({ error: 'Failed to fetch highest-rated activities' })
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
