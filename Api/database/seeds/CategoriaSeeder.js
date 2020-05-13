"use strict";

/*
|--------------------------------------------------------------------------
| CategoriaSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const Categoria = use("App/Models/Usuario/Categoria");

class CategoriaSeeder {
  async run() {
    await Categoria.create({
      nome: "Master",
      descricao: "Todo Poderoso",
      nivel: 1,
    });
    await Categoria.create({
      nome: "Admnistrador",
      descricao: "Tem acesso a tudo",
      nivel: 2,
    });
    await Categoria.create({
      nome: "Funcionário",
      descricao: "Não tem acesso ao financeiro",
      nivel: 3,
    });
    await Categoria.create({
      nome: "Cliente",
      descricao: "Só acessa o app mobile",
      nivel: 4,
    });
  }
}

module.exports = CategoriaSeeder;
