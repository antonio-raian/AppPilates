"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AtividadeSchema extends Schema {
  up() {
    this.create("atividades", (table) => {
      table.bigIncrements();
      table.bigInteger("usuario_id").references("usuarios.id").notNullable();
      table.date("data_treino").notNullable();
      table.date("data_realizado");
      table.boolean("realizado").defaultTo(false);
      table.integer("dificuldade_experada").notNullable().unsigned();
      //Avaliação
      table.integer("nota").unsigned();
      table.integer("dificuldade_sentida").unsigned();
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
