"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TreinoSchema extends Schema {
  up() {
    this.create("treinos", (table) => {
      table.bigIncrements();
      table
        .bigInteger("exercicio_id")
        .references("exercicios.id")
        .notNullable()
        .onDelete("restrict");
      table.integer("repeticoes").notNullable().unsigned();
      table.integer("qtd_series").notNullable().unsigned();
      table.integer("intervalo").notNullable().unsigned();
      table.boolean("ativo").defaultTo(true);
      table.timestamps();
    });
  }

  down() {
    this.drop("treinos");
  }
}

module.exports = TreinoSchema;
