"use strict";

const CategoriaService = use("App/Services/Usuario/CategoriaService");

class CategoriaController {
  async create({ request }) {
    const categoria = request.all();

    return await CategoriaService.create(categoria);
  }
  async read({ request }) {
    const { busca } = request.all();

    return await CategoriaService.read(busca);
  }
  async update({ request }) {
    const categoria = request.all();
    if (await CategoriaService.update(categoria)) return categoria;
    else
      throw {
        status: 400,
        message: "Nada foi alterado",
      };
  }
  async delete({ request }) {
    const categoriaId = request.all();

    return await CategoriaService.delete(categoriaId.id);
  }

  async getUsuarios({ request }) {
    const categoriaId = request.all();

    const categoria = await CategoriaService.read(categoriaId);

    await categoria.load("usuarios");

    return categoria;
  }
}

module.exports = CategoriaController;
