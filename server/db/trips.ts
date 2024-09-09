import connection from './connection'
import { Trip } from '../../models/trip'
import * as sort from '../../client/utility/dataSortingFn'

// Fetch all trips
export async function getAllTrips(): Promise<Trip[]> {
  const tripData = await connection('trips').select('*')
  return tripData as Trip[]
}

// Fetch trip by ID
export async function getTripById(id: number): Promise<Trip | undefined> {
  const tripData = await connection('trips').where({ id }).first()
  return tripData as Trip | undefined
}

// Fetch trips by  ID (through users_trips join)
export async function getTripsByUserId(auth0Id: string): Promise<Trip[]> {
  try {
    const trips = await connection('users_trips')
      .join('trips', 'users_trips.trip_id', 'trips.id')
      .join('trips_attractions', 'trips.id', 'trips_attractions.trip_id')
      .join('attractions', 'trips_attractions.attraction_id', 'attractions.id')
      .where('users_trips.auth0Id', auth0Id)
      .select(
        'trips.trip_name',
        'attractions.id',
        'attractions.name',
        'attractions.imageUrl',
        'attractions.userRating',
        'trips.id as trip_id',
      )

    return { trips: sort.default(trips), listOfTrips: sort.ListTrips(trips) }
  } catch (error) {
    console.error('Error fetching trips:', error)
    throw error
  }
}

// Add a new trip
export async function addTrip(newTrip, auth0Id): Promise<Trip> {
  //console.log('inside trip.ts', newTrip, Auth0Sub)
  const [trip] = await connection('trips')
    .insert({ trip_name: newTrip })
    .returning('*')
  console.log('trip,', trip)
  console.log('here we are in server', trip.id, auth0Id)
  await connection('users_trips').insert({
    trip_id: trip.id,
    user_id: auth0Id,
  })
}

// Delete a trip by ID
export async function deleteTripById(id: number): Promise<number> {
  return connection('trips').where({ id }).del()
}

// Update a trip by ID
export async function updateTripById(
  id: number,
  updates: Partial<Trip>,
): Promise<Trip | undefined> {
  const [trip] = await connection('trips')
    .where({ id })
    .update(updates)
    .returning('*')
  return trip as Trip | undefined
}
