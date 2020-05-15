"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AtividadeSchema extends Schema {
  up() {
    this.create("atividades", (table) => {
      table.bigIncrements();
      table.bigInteger("usuario_id").references("usuarios.id").notNullable();
      table.string("titulo").notNullable();
      table.date("data_treino").notNullable();
      table.date("data_realizado");
      table.boolean("realizado").defaultTo(false);
      table.float("dificuldade_esperada").notNullable().unsigned();
      //Avaliação
      table.float("dificuldade_sentida").unsigned();
      table.string("comentario");
      //------------------------------------
      table.boolean("ativo").defaultTo(true);
      table.timestamps();
    });
  }

  down() {
    this.drop("atividades");
  }
}

module.exports = AtividadeSchema;
