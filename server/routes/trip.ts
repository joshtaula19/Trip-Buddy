// server/routes/trips.ts
import express from 'express'
import * as db from '../db/trips'
import checkJwt from '../auth0'

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
// Get all trips
router.get('/auth0id', async (req, res) => {
  const auth0Id = req.query.auth0Id
  //console.log('this is auth0Id in route',auth0Id)
  
  try {
    const tripsByUser = await db.getTripsByUserId(auth0Id) //await db.getAllTripsByAuth0ID()//Auth0ID
    
    res.json(tripsByUser)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trips' })
  }
})
router.get('/userprofile', checkJwt,async (req, res) => { //checkJwt,
  const auth0Id = req.query.auth0Id;
  
  console.log('route profileeeeee',auth0Id)

  try {
    const tripsByUser = await db.getTripsByUserId(auth0Id);
    console.log('this is data of userPROFILE from route', auth0Id,tripsByUser) // await db.getAllTripsByAuth0ID()//Auth0ID
    res.json(tripsByUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trips' });
  }
});

// //Error-handling middleware for JWT check
// router.use((err, req, res, next) => {
//   if (err.name === 'UnauthorizedError') {
//     return res.status(401).json({ message: 'Invalid or missing token' });
//   }
//   next(err);
// });

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
