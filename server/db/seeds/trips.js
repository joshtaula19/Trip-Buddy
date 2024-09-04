
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries in the trips table
  await knex('trips').del()
  
  // Inserts new seed entries into the trips table
  await knex('trips').insert([
    { id: 1, trip_name: 'Paris Adventure', destination: 'Paris, France', start_date: '2024-09-01', end_date: '2024-09-10', notes: 'Includes visits to landmarks and museums.' },
    { id: 2, trip_name: 'Tokyo Trip', destination: 'Tokyo, Japan', start_date: '2024-10-01', end_date: '2024-10-10', notes: 'Experience the busy city life.' },
    { id: 3, trip_name: 'NYC Getaway', destination: 'New York, USA', start_date: '2024-11-01', end_date: '2024-11-07', notes: 'Explore Central Park and museums.' },
    { id: 4, trip_name: 'Sydney Vacation', destination: 'Sydney, Australia', start_date: '2024-12-01', end_date: '2024-12-10', notes: 'Enjoy the opera house and harbor.' }
  ])
}