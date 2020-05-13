"use strict";

const UsuarioService = use("App/Services/Usuario/UsuarioService");

class UsuarioController {
  async login({ request, auth }) {
    const { from, username, password } = request.all();
    console.log("Login Request", request.all());
    const token = await auth.attempt(username, password);

    const usuario = (await UsuarioService.read(username)).toJSON()[0];
    switch (from) {
      case "web":
        if (usuario.categoria.nivel > 3 || usuario.situacao !== "Ativo")
          throw {
            status: 401,
            message: "Não possui permissão pra acessar o gerencial!",
          };
        break;
      case "mobile":
        if (usuario.situacao !== "Ativo")
          throw {
            status: 401,
            message:
              "Seu usuário não pode acessar, entre em contato com a empresa!",
          };
        break;
    }
    return {
      usuario,
      token,
    };
  }
  async create({ request }) {
    const usuario = request.all();
    console.log("BODY USUARIO CREATE", usuario);

    return await UsuarioService.create(usuario);
  }
  async read({ request }) {
    const { busca } = request.all();

    return await UsuarioService.read(busca);
  }
  async update({ request }) {
    const usuario = request.all();
    console.log("BODY USER UPDATE", usuario);
    if (await UsuarioService.update(usuario)) return usuario;
    else
      throw {
        status: 400,
        message: "Nada foi alterado",
      };
  }
}

module.exports = UsuarioController;
