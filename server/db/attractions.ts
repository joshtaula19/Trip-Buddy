import connection from './connection'
import { Attraction } from '../../models/attraction'

// Fetch all attractions
export async function getAllAttractions(): Promise<Attraction[]> {
  const attractionData = await connection('attractions').select('*')
  return attractionData as Attraction[]
}

// Fetch attraction by ID
export async function getAttractionById(id: number): Promise<Attraction | undefined> {
  const attractionData = await connection('attractions').where({ id }).first()
  return attractionData as Attraction | undefined
}

// Add a new attraction
export async function addAttraction(newAttraction: Attraction): Promise<Attraction> {
  const [attraction] = await connection('attractions').insert(newAttraction).returning('*')
  return attraction as Attraction
}

// Delete an attraction by ID
export async function deleteAttractionById(id: number): Promise<number> {
  return connection('attractions').where({ id }).del()
}

// Update an attraction by ID
export async function updateAttractionById(id: number, updates: Partial<Attraction>): Promise<Attraction | undefined> {
  const [attraction] = await connection('attractions').where({ id }).update(updates).returning('*')
  return attraction as Attraction | undefined
}