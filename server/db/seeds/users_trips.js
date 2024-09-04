/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('users_trips').del()

  // Insert seed data
  await knex('users_trips').insert([
    { user_id: 1, trip_id: 1 },
    { user_id: 2, trip_id: 1 },
    { user_id: 1, trip_id: 2 },
  ])
}