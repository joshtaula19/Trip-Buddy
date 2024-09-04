import connection from './connection'
import { TripsAttractions } from '../../models/trips_attractions'

// Fetch all attractions for a trip
export async function getAttractionsForTrip(tripId: number): Promise<TripsAttractions[]> {
  const attractionsForTrip = await connection('trips_attractions').where({ trip_id: tripId })
  return attractionsForTrip as TripsAttractions[];
}

// Fetch all trips for an attraction
export async function getTripsForAttraction(attractionId: number): Promise<TripsAttractions[]> {
  const tripsForAttraction = await connection('trips_attractions').where({ attraction_id: attractionId })
  return tripsForAttraction as TripsAttractions[]
}

// Add a new trip-attraction relationship
export async function addTripAttraction(tripAttraction: TripsAttractions): Promise<TripsAttractions> {
  const [addedTripAttraction] = await connection('trips_attractions').insert(tripAttraction).returning('*')
  return addedTripAttraction as TripsAttractions
}

// Delete a trip-attraction relationship
export async function deleteTripAttraction(tripId: number, attractionId: number): Promise<number> {
  return connection('trips_attractions')
    .where({ trip_id: tripId, attraction_id: attractionId })
    .del()
}
