"use strict";

const AtividadeService = use("App/Services/Treino/AtividadeService");

class TreinoController {
  async create({ request }) {
    const treino = request.all();

    return await AtividadeService.update(treino);
  }
  async read({ request }) {
    const { busca } = request.all();

    return await AtividadeService.read(busca);
  }
}

module.exports = TreinoController;
