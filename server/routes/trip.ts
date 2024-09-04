// server/routes/trips.ts
import express from 'express'
import * as db from '../db/trips'

const router = express.Router()

// Get all trips
router.get('/', async (req, res) => {
  try {
    const trips = await db.getAllTrips()
    res.json(trips)
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
});

// Add a new trip
router.post('/', async (req, res) => {
  const { trip_name, destination, start_date, end_date, notes } = req.body
  try {
    const newTrip = await db.addTrip({ trip_name, destination, start_date, end_date, notes })
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
