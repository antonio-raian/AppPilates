"use strict";

const UsuarioService = use("App/Services/Usuario/UsuarioService");

class UsuarioController {
  async login({ request, auth }) {
    const { username, password } = request.all();
    console.log("Login Request", request.all());
    const token = await auth.attempt(username, password);

    const usuario = (await UsuarioService.read(username)).toJSON()[0];
    return {
      usuario,
      token,
    };
  }
  async create({ request }) {
    const usuario = request.all();

    return await UsuarioService.create(usuario);
  }
  async read({ request }) {
    const { busca } = request.all();

    return await UsuarioService.read(busca);
  }
  async update({ request }) {
    const usuario = request.all();
    if (await UsuarioService.update(usuario)) return usuario;
    else
      throw {
        status: 400,
        message: "Nada foi alterado",
      };
  }
}

module.exports = UsuarioController;
