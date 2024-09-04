import express from 'express'
import * as dbTrip from '../db/trips'
import * as dbUserTrip from '../db/users-trips'
import * as dbTripAttraction from '../db/trips-attractions'

const router = express.Router()

// Get trips by user ID
router.get('/users/:userId/trips', async (req, res) => {
  const { userId } = req.params;
  try {
    const trips = await dbTrip.getTripsByUserId(Number(userId))
    res.json(trips);
  } catch (error) {
    console.error('Error fetching trips for user:', error)
    res.status(500).json({ error: 'Failed to fetch trips for user' });
  }
});

// Add a new user-trip relationship
router.post('/users/:userId/trips/:tripId', async (req, res) => {
  const { userId, tripId } = req.params
  try {
    const newUserTrip = await dbUserTrip.addUserTrip({ user_id: Number(userId), trip_id: Number(tripId) })
    res.status(201).json(newUserTrip)
  } catch (error) {
    console.error('Error adding user-trip relationship:', error)
    res.status(500).json({ error: 'Failed to add user-trip relationship' })
  }
})

// Delete a user-trip relationship
router.delete('/users/:userId/trips/:tripId', async (req, res) => {
  const { userId, tripId } = req.params
  try {
    const rowsDeleted = await dbUserTrip.deleteUserTrip(Number(userId), Number(tripId))
    if (rowsDeleted > 0) {
      res.status(204).end()
    } else {
      res.status(404).json({ error: 'User-trip relationship not found' })
    }
  } catch (error) {
    console.error('Error deleting user-trip relationship:', error)
    res.status(500).json({ error: 'Failed to delete user-trip relationship' })
  }
});

// Get attractions by trip ID
router.get('/trips/:tripId/attractions', async (req, res) => {
  const { tripId } = req.params
  try {
    const attractions = await dbTripAttraction.getAttractionsForTrip(Number(tripId))
    res.json(attractions)
  } catch (error) {
    console.error('Error fetching attractions for trip:', error)
    res.status(500).json({ error: 'Failed to fetch attractions for trip' })
  }
});

// Add a new trip-attraction relationship
router.post('/trips/:tripId/attractions/:attractionId', async (req, res) => {
  const { tripId, attractionId } = req.params
  try {
    const newTripAttraction = await dbTripAttraction.addTripAttraction({ trip_id: Number(tripId), attraction_id: Number(attractionId) })
    res.status(201).json(newTripAttraction)
  } catch (error) {
    console.error('Error adding trip-attraction relationship:', error)
    res.status(500).json({ error: 'Failed to add trip-attraction relationship' });
  }
})

// Delete a trip-attraction relationship
router.delete('/trips/:tripId/attractions/:attractionId', async (req, res) => {
  const { tripId, attractionId } = req.params
  try {
    const rowsDeleted = await dbTripAttraction.deleteTripAttraction(Number(tripId), Number(attractionId))
    if (rowsDeleted > 0) {
      res.status(204).end()
    } else {
      res.status(404).json({ error: 'Trip-attraction relationship not found' })
    }
  } catch (error) {
       console.error('Error deleting trip-attraction relationship:', error)
    res.status(500).json({ error: 'Failed to delete trip-attraction relationship' })
  }
})