/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
    // Deletes ALL existing entries in the trips_attractions table
  await knex('trips_attractions').del()

  await knex('trips_attractions').insert([
    { trip_id: 1, attraction_id: 1 }, 
    { trip_id: 4, attraction_id: 2 }, 
    { trip_id: 2, attraction_id: 3 }, 
    { trip_id: 3, attraction_id: 4 }, 
  ])
}