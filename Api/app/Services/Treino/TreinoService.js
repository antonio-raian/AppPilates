"use strict";

const Treino = use("App/Models/Treino/Treino");

class TreinoService {
  static async create(novoTreino) {
    return await Treino.create(novoTreino);
  }
  static async read(busca) {
    if (busca) {
      if (busca.id)
        return await Treino.query()
          .where("id", busca.id)
          .with("exercicio")
          .fetch();
    }
    return await Treino.query().with("exercicio").fetch();
  }
  static async update(novoTreino) {
    if (!novoTreino.id)
      throw {
        status: 400,
        message: "Não foi indicado o exercício para a alteração",
      };

    const treino = await Treino.find(novoTreino.id);

    if (!treino)
      throw {
        status: 400,
        message: "Treino não encontrado",
      };

    treino.exercicio_id = novoTreino.exercicio_id || treino.exercicio_id;
    treino.repeticoes = novoTreino.repeticoes || treino.repeticoes;
    treino.qtd_series = novoTreino.qtd_series || treino.qtd_series;
    treino.intervalo = novoTreino.intervalo || treino.intervalo;

    return await treino.save();
  }
  static async delete(id) {
    if (!id)
      throw {
        status: 400,
        message: "Não foi indicado o Treino para a remoção",
      };

    const treino = await Treino.find(id);

    if (!treino)
      throw {
        status: 400,
        message: "Treino não encontrado",
      };
    if (!treino.ativo)
      throw {
        status: 400,
        message: "Treino já removido",
      };

    await treino.load("atividades");
    console.log("Exer", treino.toJSON());

    if (treino.toJSON().atividades.length > 0) {
      treino.ativo = false;

      return await treino.save();
    }
    return await treino.delete();
  }
}

module.exports = TreinoService;
