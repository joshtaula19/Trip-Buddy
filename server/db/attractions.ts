import connection from './connection'
import { FormattedAttraction } from '../../models/attraction'

// Fetch all attractions
export async function getAllAttractions(): Promise<FormattedAttraction[]> {
  const attractionData = await connection('attractions').select('*')
  return attractionData as FormattedAttraction[]
}

// Fetch attraction by ID
export async function getAttractionById(id: number): Promise<FormattedAttraction | undefined> {
  const attractionData = await connection('attractions').where({ id }).first()
  return attractionData as FormattedAttraction | undefined
}

// Add a new attraction
export async function addAttraction(newAttraction: FormattedAttraction,trip_id:number): Promise<Attraction> {
  const {name,imageUrl,userRating} =newAttraction
  let attraction_id:number
 
  try {
    const existingAttraction = await connection('attractions')
    .where({ name })
    .first();
    if (existingAttraction) {
      // If an attraction with this name already exists, return its ID
      console.log('add attraction::exising:::',existingAttraction.id)
      attraction_id =existingAttraction.id;

    } else {
    const [insertedId] = await connection('attractions').insert({name,imageUrl,userRating}).returning('id')
    attraction_id = insertedId.id
  }
  console.log('add attraction:::::',{trip_id,attraction_id})
    await connection('trips_attractions').insert({trip_id,attraction_id})

  } catch (error) {
    console.error('Failed to add new attraction:', error)
    throw error
  }
 
  
}

// Delete an attraction by ID
export async function deleteAttractionById(id: number): Promise<number> {
  try {
    await connection('trips_attractions').where({ attraction_id:id }).del()
  } catch (error) {
    console.error('Failed to delete  attraction:', error)
    throw error
  } 
}

// Update an attraction by ID
export async function updateAttractionById(id: number, updates: Partial<Attraction>): Promise<Attraction | undefined> {
  const [attraction] = await connection('attractions').where({ id }).update(updates).returning('*')
  return attraction as Attraction | undefined
}