"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ExercicioSchema extends Schema {
  up() {
    this.create("exercicios", (table) => {
      table.bigIncrements();
      table.string("nome", 50).notNullable().unique();
      table.string("descricao").notNullable();
      table.string("link").notNullable();
      table.boolean("ativo").defaultTo(true);
      table.timestamps();
    });
  }

  down() {
    this.drop("exercicios");
  }
}

module.exports = ExercicioSchema;
