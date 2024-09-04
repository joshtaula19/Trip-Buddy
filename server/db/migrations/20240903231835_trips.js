/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<Knex.SchemaBuilder> }
 */
export function up(knex) {
  return knex.schema.createTable('trips', (table) => {
    table.increments('id').primary() 
    table.string('trip_name').notNullable() 
    table.string('destination').notNullable()
    table.date('start_date').notNullable() 
    table.date('end_date').notNullable() 
    table.text('notes')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('trips')
}