"use strict";

const AtividadeService = use("App/Services/Treino/AtividadeService");

class AtividadeController {
  async create({ request }) {
    const { atividade, treinos } = request.all();

    return await AtividadeService.create(atividade, treinos);
  }
  async read({ request }) {
    const busca = request.all();

    return await AtividadeService.read(busca);
  }
  async update({ request }) {
    const atividade = request.all();
    if (await AtividadeService.update(atividade)) return atividade;

    throw {
      status: 400,
      message: "Nada foi alterado",
    };
  }
  async delete({ request }) {
    const atividade = request.all();

    return await AtividadeService.delete(atividade.id);
  }
}

module.exports = AtividadeController;
