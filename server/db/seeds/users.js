/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1,
      username: 'josh',
      phone: '021345454',
      email: 'john@example.com',
      Auth0ID: 'google-oauth2|111989194491154769499',
    },
    {
      id: 2,
      username: 'chris',
      phone: '022123434',
      email: 'jane@example.com',
      Auth0ID: '67890',
    },
    {
      id: 3,
      username: 'lei',
      phone: '027349663',
      email: 'alex@example.com',
      Auth0ID: 'auth0|66dcf45af321ee72838d7e47',
    },
    {
      id: 4,
      username: 'joy',
      phone: '021213455',
      email: 'lisa@example.com',
      Auth0ID: '24680',
    },
  ])
}
