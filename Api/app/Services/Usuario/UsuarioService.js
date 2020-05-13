"use strict";

const Usuario = use("App/Models/Usuario/Usuario");

class UsuarioService {
  static async create(novoUsuario) {
    return await Usuario.create(novoUsuario);
  }
  static async read(busca) {
    return busca
      ? busca.id //Se tiver busca
        ? await Usuario.query()
            .where("id", busca.id)
            .orderBy("username", "asc")
            .with("categoria")
            .fetch() //Se tiver id
        : busca.situacao //Se não tiver id
        ? await Usuario.query()
            .where("situacao", busca.situacao)
            .orderBy("username", "asc")
            .with("categoria")
            .fetch() //Se tiver situacao
        : await Usuario.query() //Se não tiver id nem situação
            .whereRaw("LOWER(username) LIKE (?)", busca)
            .orderBy("username", "asc")
            .with("categoria")
            .fetch()
      : await Usuario.query()
          .orderBy("username", "asc")
          .with("categoria")
          .fetch(); //Se não tiver busca
  }
  static async update(novoUsuario) {
    if (!novoUsuario.id)
      throw { status: 400, message: "Não inormado o usuário para a alteração" };

    const user = await Usuario.find(novoUsuario.id);

    if (!user) throw { status: 400, message: "Usuario não encontrado" };

    user.username = novoUsuario.username || user.username;
    user.categoria_id = novoUsuario.categoria_id || user.categoria_id;
    user.password = novoUsuario.password || undefined;
    user.situacao = novoUsuario.situacao || user.situacao;

    return user.save();
  }
}

module.exports = UsuarioService;
