import React, { useState, useEffect } from "react";
import moment from "moment";

import { Grid, Typography, Paper, Box } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import TableComponent from "../../components/TableComponent";
import { ButtonSuccess } from "./styled";
import Novo from "./Novo";
import Atualizar from "./Atualizar";
import { post, remove } from "../../services/Requests";
import Visualizar from "./Visualizar";
import Deletar from "../../components/Deletar";
import { Edit, Delete } from "@material-ui/icons";

const colunas = [
  { title: "Nome", field: "nome" },
  { title: "Ativo", field: "ativo" },
  { title: "Criado em", field: "data" },
];
const Exercicio = () => {
  const [modalNovo, setModalNovo] = useState(false);
  const [modalAtualizar, setModalAtualizar] = useState(false);
  const [modalDeletar, setModalDeletar] = useState(false);

  const [exercicios, setExercicios] = useState([]);
  const [exerUpload, setExerUpload] = useState({});

  useEffect(() => {
    _handleLoad();
  }, []);

  const _handleLoad = () => {
    post("/exercicio/busca", {})
      .then((res) => {
        console.log("Resposta Busca Exercicios", res);
        const exerList = [];
        res.map((exer) => {
          return exerList.push({
            id: exer.id,
            nome: exer.nome,
            descricao: exer.descricao,
            link: exer.link,
            ativo: exer.ativo ? "Ativo" : "Removido",
            data: moment(exer.created_at).format("DD/MM/YYYY HH:mm"),
          });
        });
        setExercicios(exerList);
      })
      .catch((err) => {
        console.log("Erro Busca Exercicios", JSON.stringify(err));
      });
  };

  const _handleDelete = () => {
    console.log(exerUpload);
    remove("/exercicio/delete", { id: exerUpload.id })
      .then((res) => {
        if (res) {
          setModalDeletar(false);
          _handleLoad();
        }
      })
      .catch((err) => alert(err));
  };

  return (
    <>
      <Novo open={modalNovo} setOpen={setModalNovo} refresh={_handleLoad} />
      <Atualizar
        item={exerUpload}
        open={modalAtualizar}
        setOpen={setModalAtualizar}
        refresh={_handleLoad}
      />
      <Deletar
        open={modalDeletar}
        setOpen={setModalDeletar}
        title={"Deletando Usuário"}
        message={`Deseja Mesmo deletar o usuário: ${exerUpload.nome}?`}
        actionYes={_handleDelete}
        actionNot={() => {
          setModalDeletar(false);
        }}
      />

      <Paper square>
        <Grid container style={{}}>
          <Grid item xs={12} md={12} lg={12}>
            <TableComponent
              top={true}
              title={
                <Grid container>
                  <Grid item>
                    <Box pr={4}>
                      <Typography variant="h2">Exercícios</Typography>
                    </Box>
                  </Grid>

                  <Grid item>
                    <ButtonSuccess
                      color="primary"
                      onClick={() => setModalNovo(true)}
                    >
                      <AddIcon /> Novo Exercício
                    </ButtonSuccess>
                  </Grid>
                </Grid>
              }
              columns={colunas}
              data={exercicios}
              actions={[
                (rowData) => ({
                  icon: () => <Edit />,
                  tooltip: "Editar Linha",
                  onClick: () => {
                    setExerUpload(rowData);
                    setModalAtualizar(true);
                  },
                }),
                (rowData) => ({
                  icon: () => <Delete />,
                  tooltip: "Remover Linha",
                  onClick: () => {
                    setExerUpload(rowData);
                    setModalDeletar(true);
                  },
                }),
              ]}
              handleDetails={(obj) => (
                <Visualizar
                  nome={obj.nome}
                  descricao={obj.descricao}
                  link={obj.link}
                  data={obj.data}
                />
              )}
            />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Exercicio;
