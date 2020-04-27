"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Categoria extends Model {
  usuarios() {
    return this.hasMany("App/Models/Usuario/Usuario");
  }
}

module.exports = Categoria;
