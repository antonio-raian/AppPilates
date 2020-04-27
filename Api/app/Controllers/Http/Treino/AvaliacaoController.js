"use strict";

const AvaliacaoService = use("App/Services/Treino/AvaliacaoService");

class TreinoController {
  async create({ request }) {
    const treino = request.all();

    return await AvaliacaoService.create(treino);
  }
  async read({ request }) {
    const { busca } = request.all();

    return await AvaliacaoService.read(busca);
  }
}

module.exports = TreinoController;
