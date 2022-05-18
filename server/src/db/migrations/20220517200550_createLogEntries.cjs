/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("logEntries", (table) => {
    table.bigIncrements("id")
    table
      .bigInteger("logId")
      .notNullable()
      .unsigned()
      .index()
      .references("logs.id")
    table
      .bigInteger("consumableId")
      .notNullable()
      .unsigned()
      .index()
      .references("consumables.id")
    table
      .timestamp("createdAt")
      .notNullable()
      .defaultTo(knex.fn.now())
    table
      .timestamp("updatedAt")
      .notNullable()
      .defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("logEntries")
}
