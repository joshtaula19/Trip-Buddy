/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('users_trips', (table) => {
    table.string('auth0Id').notNullable

    table
      .integer('trip_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('trips')
      .onDelete('CASCADE')

    // Composite primary key to ensure each user-trip pair is unique
    table.primary(['auth0Id', 'trip_id'])
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('users_trips')
}
