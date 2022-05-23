/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("consumables", (table) => {
    table.bigIncrements("id")
    table.string("name").notNullable()
    table.string("unit").notNullable()
    table.integer("calories").notNullable()
    table.integer("fat").notNullable()
    table.integer("protein").notNullable()
    table.integer("carbs").notNullable()
    table.timestamp("createdAt")
      .notNullable()
      .defaultTo(knex.fn.now())
    table.timestamp("updatedAt")
      .notNullable()
      .defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("consumables")
}
