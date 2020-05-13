"use strict";

const Atividade = use("App/Models/Treino/Atividade");

class AtividadeService {
  static async create(novaAtividade, treinos) {
    const atividade = await Atividade.create(novaAtividade);

    await atividade.treinos().attach(treinos);
    await atividade.load("treinos.exercicio");
    return atividade;
  }

  static async read(busca) {
    if (busca) {
      if (busca.id)
        return await Atividade.query()
          .where("id", busca.id)
          .with("usuario")
          .with("treinos.exercicio")
          .fetch();
      if (busca.data_treino) {
        if (busca.usuario_id) {
          return await Atividade.query()
            .where("data_treino", busca.data_treino)
            .andWhere("usuario_id", busca.usuario_id)
            .orderBy("data_treino")
            .with("treinos.exercicio")
            .fetch();
        }
        return await Atividade.query()
          .where("data_treino", busca.data_treino)
          .orderBy("data_treino")
          .with("treinos.exercicio")
          .fetch();
      }
      if (busca.usuario_id) {
        return await Atividade.query()
          .where("usuario_id", busca.usuario_id)
          .orderBy("data_treino")
          .with("treinos.exercicio")
          .fetch();
      }
    }
    return await Atividade.query()
      .with("usuario")
      .with("treinos.exercicio")
      .orderBy("data_treino")
      .fetch();
  }

  static async update(novaAtividade) {
    if (!novaAtividade.id)
      throw {
        status: 400,
        message: "Não foi indicada a Atividade para a alteração",
      };

    const atividade = await Atividade.find(novaAtividade.id);

    if (!atividade)
      throw {
        status: 400,
        message: "Atividade não encontrada",
      };

    atividade.usuario_id = novaAtividade.usuario_id || atividade.usuario_id;
    atividade.data_treino = novaAtividade.data_treino || atividade.data_treino;
    atividade.data_realizado =
      novaAtividade.data_realizado || atividade.data_realizado;
    atividade.realizado = novaAtividade.realizado || atividade.realizado;
    atividade.dificuldade_sentida =
      novaAtividade.dificuldade_sentida || atividade.dificuldade_sentida;
    atividade.comentario = novaAtividade.comentario || atividade.comentario;

    return await atividade.save();
  }
  static async delete(id) {
    if (!id)
      throw {
        status: 400,
        message: "Não foi indicada a Atividade para a remoção",
      };

    const atividade = await Atividade.find(id);

    if (!atividade)
      throw {
        status: 400,
        message: "Treino de usuario não encontrado",
      };
    if (!atividade.ativo)
      throw {
        status: 400,
        message: "Treino de usuario já removido",
      };

    atividade.ativo = false;

    return await atividade.save();
  }
}

module.exports = AtividadeService;
