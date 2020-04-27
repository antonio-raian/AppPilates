"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.create("usuarios", (table) => {
      table.bigIncrements();
      table.string("username", 80).notNullable().unique();
      table.string("password", 60).notNullable();
      table
        .bigInteger("categoria_id")
        .references("categorias.id")
        .notNullable();
      table.enum("situacao", ["Ativo", "Inativo", "Inadimplente"]).defaultTo(0);
      table.timestamps();
    });
  }

  down() {
    this.drop("usuarios");
  }
}

module.exports = UserSchema;
