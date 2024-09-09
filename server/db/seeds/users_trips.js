/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('users_trips').del()

  // Insert seed data
  await knex('users_trips').insert([
    { Auth0ID: 'auth0|66dcf45af321ee72838d7e47', trip_id: 1 },
    { Auth0ID: 2, trip_id: 1 },
    { Auth0ID: 'auth0|66dcf45af321ee72838d7e47', trip_id: 2 },
  ])
}