"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Atividade extends Model {
  treinos() {
    return this.belongsToMany("App/Models/Treino/Treino").pivotTable(
      "atividade_treinos"
    );
  }

  usuario() {
    return this.belongsTo("App/Models/Usuario/Usuario");
  }
}

module.exports = Atividade;
