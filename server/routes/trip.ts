// server/routes/trips.ts
import express from 'express'
import * as db from '../db/trips'
import checkJwt, { JwtRequest } from '../auth0'

const router = express.Router()

// Get all trips
router.get('/', checkJwt, async (req: JwtRequest, res) => {
  const auth0Id = req.auth?.sub

  if (!auth0Id) {
    return res.status(500).send('An unknown error occurred')
  }
  try {
    const tripsByUser = await db.getTripsByUserId(auth0Id)
    console.log('this is data of userPROFILE from route', auth0Id, tripsByUser) // await db.getAllTripsByAuth0ID()//Auth0ID
    res.json(tripsByUser)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trips' })
  }
})

// Get a trip by ID
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    const trip = await db.getTripById(id)
    res.json(trip)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trip' })
  }
})

// Add a new trip
router.post('/', async (req, res) => {
  const { trip_name, auth0Id } = req.body
  // console.log('trip.ts trip_name, Auth0Sub', trip_name, Auth0Sub)
  try {
    const newTrip = await db.addTrip(trip_name, auth0Id)
    res.status(201).json(newTrip)
  } catch (error) {
    res.status(500).json({ error: 'Failed to add trip' })
  }
})

// Update an existing trip
router.put('/:id', async (req, res) => {
  try {
    const updatedTrip = req.body
    await db.updateTripById(Number(req.params.id), updatedTrip)
    res.json({ message: 'Trip updated successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to update trip' })
  }
})

// Delete a trip
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    await db.deleteTripById(Number(id))
    res.json({ message: 'Trip deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete trip' })
  }
})

export default router
