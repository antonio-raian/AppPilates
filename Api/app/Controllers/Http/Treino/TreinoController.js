"use strict";

const TreinoService = use("App/Services/Treino/TreinoService");

class TreinoController {
  async create({ request }) {
    const treino = request.all();

    return await TreinoService.create(treino);
  }
  async read({ request }) {
    const { busca } = request.all();

    return await TreinoService.read(busca);
  }
  async update({ request }) {
    const treino = request.all();
    if (await TreinoService.update(treino)) return treino;
    else
      throw {
        status: 400,
        message: "Nada foi alterado",
      };
  }
  async delete({ params }) {
    return await TreinoService.delete(params.id);
  }
}

module.exports = TreinoController;
