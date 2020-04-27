"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CategoriaSchema extends Schema {
  up() {
    this.create("categorias", (table) => {
      table.bigIncrements();
      table.string("nome", 50).unique().notNullable();
      table.string("descricao", 200).notNullable();
      table.boolean("ativa").defaultTo(true);
      table.timestamps();
    });
  }

  down() {
    this.drop("categorias");
  }
}

module.exports = CategoriaSchema;
