"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Treino extends Model {
  exercicio() {
    return this.belongsTo("App/Models/Treino/Exercicio");
  }

  atividades() {
    return this.belongsToMany("App/Models/Treino/Atividade").pivotTable(
      "atividade_treinos"
    );
  }
}

module.exports = Treino;
