/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('trips_attractions', (table) => {
    table
    .integer('trip_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('trips')
    .onDelete('CASCADE')

    table
    .integer('attraction_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('attractions')
    .onDelete('CASCADE')

    // Composite primary key to prevent duplicates
    table.primary(['trip_id', 'attraction_id'])
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('trips_attractions')
}
