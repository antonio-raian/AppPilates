"use strict";

const ExercicioService = use("App/Services/Treino/ExercicioService");

class ExercicioController {
  async create({ request }) {
    const exercicio = request.all();
    console.log("BODY CREATE EXERCICIO", exercicio);

    return await ExercicioService.create(exercicio);
  }
  async read({ request }) {
    const { busca } = request.all();

    return await ExercicioService.read(busca);
  }
  async update({ request }) {
    const exercicio = request.all();
    if (await ExercicioService.update(exercicio)) return exercicio;
    else
      throw {
        status: 400,
        message: "Nada foi alterado",
      };
  }
  async delete({ params }) {
    return await ExercicioService.delete(params.id);
  }
}

module.exports = ExercicioController;
