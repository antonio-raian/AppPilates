const BaseExceptionHandler = use("BaseExceptionHandler");

class ExceptionHandler extends BaseExceptionHandler {
  async handle(error, { response, session }) {
    console.log("have error", error);

    if (String(error.code) === "23502") {
      return response.status(400).send({
        title: "Faltou dado pra registo",
        message: `Informe o ${error.column} para criação de ${error.table}`,
      });
    }

    if (String(error.code) === "23505") {
      const detail = error.detail.match(/\(([^()]+)\)/g);
      const column = detail[0].replace(")", "");
      const value = detail[1].replace("(", "");
      return response.status(400).send({
        title: "Duplicado",
        message: `Já existe um cadastro com ${column} => ${value}`,
      });
    }

    if (String(error.code) === "22P02") {
      return response.status(400).send({
        title: "Campo inválido",
        message: `O tipo de dado informado é inválido: ${error.message
          .substring(error.message.indexOf("type"))
          .slice(5)}`,
      });
    }

    if (String(error.code) === "22001") {
      return response.status(400).send({
        title: "Muitos caracteres",
        message: `O tipo de dado informado contém mais dados do que o permitido ${error.message.substring(
          error.message.indexOf("(")
        )}`,
      });
    }

    if (String(error.code) === "23503") {
      const detail = error.detail.match(/\(([^()]+)\)/g);
      const column = detail[0].replace("(", "").replace(")", "");
      const value = detail[1].replace("(", "").replace(")", "");
      return response.status(400).send({
        title: "Dependencia Inexistente",
        message: `${value} não existe na referencia ${column}`,
      });
    }

    if (
      error.message.includes("Cannot verify user password") ||
      error.message.includes("Cannot find user with")
    )
      return response
        .status(error.status)
        .send({ message: "Usuário ou Senha incorretos" });

    return response.status(error.status).send({ message: error.message });
    // return super.handle(...arguments);
  }
}

module.exports = ExceptionHandler;
