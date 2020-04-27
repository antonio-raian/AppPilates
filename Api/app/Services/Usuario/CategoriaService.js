"use strict";

const Categoria = use("App/Models/Usuario/Categoria");

class CategoriaService {
  static async create(novaCategoria) {
    return await Categoria.create(novaCategoria);
  }
  static async read(busca) {
    return busca
      ? busca.id
        ? await Categoria.find(busca.id)
        : await Categoria.query()
            .whereRaw("LOWER(nome) LIKE(?)", busca)
            .whereRaw("LOWER(descricao) LIKE(?)", busca)
            .fetch()
      : await Categoria.all();
  }
  static async update(novaCategoria) {
    if (!novaCategoria.id)
      throw {
        status: 400,
        message: "Não foi indicada a categoria para a alteração",
      };

    const categoria = await Categoria.find(novaCategoria.id);

    if (!categoria)
      throw {
        status: 400,
        message: "Categoria não encontrada",
      };

    categoria.nome = novaCategoria.nome || categoria.nome;
    categoria.descricao = novaCategoria.descricao || categoria.descricao;

    return await categoria.save();
  }
  static async delete(id) {
    if (!id)
      throw {
        status: 400,
        message: "Não foi indicada a categoria para a remoção",
      };

    const categoria = await Categoria.find(id);

    if (!categoria)
      throw {
        status: 400,
        message: "Categoria não encontrada",
      };
    if (!categoria.ativa)
      throw {
        status: 400,
        message: "Categoria já removida",
      };

    categoria.ativa = false;

    return await categoria.save();
  }
}

module.exports = CategoriaService;
