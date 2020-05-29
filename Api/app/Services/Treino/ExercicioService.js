"use strict";

const Exercicio = use("App/Models/Treino/Exercicio");

class ExercicioService {
  static async create(novoExercicio) {
    return await Exercicio.create(novoExercicio);
  }
  static async read(busca) {
    return busca
      ? busca.id
        ? await Exercicio.query().where("id", busca.id).with("treinos").fetch()
        : await Exercicio.query()
            .whereRaw("LOWER(nome) LIKE(?)", busca)
            .with("treinos")
            .fetch()
      : await Exercicio.query().with("treinos").fetch();
  }
  static async update(novoExercicio) {
    if (!novoExercicio.id)
      throw {
        status: 400,
        message: "Não foi indicado o exercício para a alteração",
      };

    const exercicio = await Exercicio.find(novoExercicio.id);

    if (!exercicio)
      throw {
        status: 400,
        message: "Exercicio não encontrado",
      };

    exercicio.nome = novoExercicio.nome || exercicio.nome;
    exercicio.descricao = novoExercicio.descricao || exercicio.descricao;
    exercicio.link = novoExercicio.link || exercicio.link;

    return await exercicio.save();
  }
  static async delete(id) {
    if (!id)
      throw {
        status: 400,
        message: "Não foi indicado o exercicio para a remoção",
      };

    const exercicio = await Exercicio.find(id);

    if (!exercicio)
      throw {
        status: 400,
        message: "Exercicio não encontrado",
      };
    if (!exercicio.ativo)
      throw {
        status: 400,
        message: "Exercicio já removido",
      };
    await exercicio.load("treinos");

    if (exercicio.toJSON().treinos.length > 0) {
      exercicio.ativo = false;

      return await exercicio.save();
    }
    return await exercicio.delete();
  }
}

module.exports = ExercicioService;
