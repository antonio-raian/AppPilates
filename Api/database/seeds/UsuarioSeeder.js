"use strict";

/*
|--------------------------------------------------------------------------
| UsuarioSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const Usuario = use("App/Models/Usuario/Usuario");

class UsuarioSeeder {
  async run() {
    await Usuario.create({
      username: "antonio",
      password: "22121409",
      categoria_id: 1,
      situacao: "Ativo",
    });
  }
}

module.exports = UsuarioSeeder;
