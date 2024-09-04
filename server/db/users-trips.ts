import connection from './connection'
import { UsersTrips } from '../../models/users_trips'

// Fetch all trips for a user
export async function getTripsForUser(userId: number): Promise<UsersTrips[]> {
  const tripsForUser = await connection('users_trips').where({ user_id: userId })
  return tripsForUser as UsersTrips[]
}

// Fetch all users for a trip
export async function getUsersForTrip(tripId: number): Promise<UsersTrips[]> {
  const usersForTrip = await connection('users_trips').where({ trip_id: tripId })
  return usersForTrip as UsersTrips[]
}

// Add a new user-trip relationship
export async function addUserTrip(userTrip: UsersTrips): Promise<UsersTrips> {
  const [addedUserTrip] = await connection('users_trips').insert(userTrip).returning('*')
  return addedUserTrip as UsersTrips
}

// Delete a user-trip relationship
export async function deleteUserTrip(userId: number, tripId: number): Promise<number> {
  return connection('users_trips')
    .where({ user_id: userId, trip_id: tripId })
    .del()
}
