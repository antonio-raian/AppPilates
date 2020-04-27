"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AtividadeTreinoSchema extends Schema {
  up() {
    this.create("atividade_treinos", (table) => {
      table.bigIncrements();
      table
        .bigInteger("atividade_id")
        .references("atividades.id")
        .notNullable()
        .onDelete("cascade");
      table
        .bigInteger("treino_id")
        .references("treinos.id")
        .notNullable()
        .onDelete("cascade");
    });
  }

  down() {
    this.drop("atividade_treinos");
  }
}

module.exports = AtividadeTreinoSchema;
