"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");
const Helpers = use("Helpers");

Route.get("/", () => {
  return { greeting: "Você está na api do Bruna Pilates" };
});

Route.get("/get_version/:version", ({ params, response }) => {
  // return Helpers.appRoot("/app");
  response.download(Helpers.appRoot(`/versions/${params.version}.apk`));
});

Route.group("categoria", () => {
  Route.post("/nova", "Usuario/CategoriaController.create");
  Route.post("/busca", "Usuario/CategoriaController.read");
  Route.post("/altera", "Usuario/CategoriaController.update");
  Route.delete("/delete", "Usuario/CategoriaController.delete");
  Route.post("/usuarios", "Usuario/CategoriaController.getUsuarios");
})
  .prefix("/categoria")
  .middleware(["auth"]);

Route.group("usuario", () => {
  Route.post("/novo", "Usuario/UsuarioController.create");
  Route.post("/busca", "Usuario/UsuarioController.read");
  Route.post("/altera", "Usuario/UsuarioController.update");
})
  .prefix("/usuario")
  .middleware(["auth"]);

Route.post("/usuario/login", "Usuario/UsuarioController.login");

//Treinos
Route.group("exercicio", () => {
  Route.post("/novo", "Treino/ExercicioController.create");
  Route.post("/busca", "Treino/ExercicioController.read");
  Route.post("/altera", "Treino/ExercicioController.update");
  Route.delete("/delete", "Treino/ExercicioController.delete");
})
  .prefix("/exercicio")
  .middleware(["auth"]);

Route.group("treino", () => {
  Route.post("/novo", "Treino/TreinoController.create");
  Route.post("/busca", "Treino/TreinoController.read");
  Route.post("/altera", "Treino/TreinoController.update");
  Route.delete("/delete", "Treino/TreinoController.delete");
})
  .prefix("/treino")
  .middleware(["auth"]);

Route.group("atividade", () => {
  Route.post("/nova", "Treino/AtividadeController.create");
  Route.post("/busca", "Treino/AtividadeController.read");
  Route.post("/altera", "Treino/AtividadeController.update");
  Route.delete("/delete", "Treino/AtividadeController.delete");
})
  .prefix("/usuario/atividade")
  .middleware(["auth"]);

Route.group("avaliacao", () => {
  Route.post("/nova", "Treino/AvaliacaoController.create");
  Route.post("/busca", "Treino/AvaliacaoController.read");
})
  .prefix("/usuario/avaliacao")
  .middleware(["auth"]);
