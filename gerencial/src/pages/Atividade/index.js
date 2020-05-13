import React, { useState, useEffect } from "react";
import moment from "moment";

import { Grid, Typography, Paper, Box } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import TableComponent from "../../components/TableComponent";
import { ButtonSuccess } from "./styled";
import Novo from "./Novo";
import { post, remove } from "../../services/Requests";
import Visualizar from "./Visualizar";
import Deletar from "../../components/Deletar";
import { Edit, Delete } from "@material-ui/icons";

const colunas = [
  { title: "Usuário", field: "username" },
  { title: "Título", field: "titulo" },
  { title: "Agendamento", field: "data_treino" },
  { title: "Realizado", field: "realizado" },
  { title: "Criado em", field: "data" },
];
const Atividade = () => {
  const [modalNovo, setModalNovo] = useState(false);
  const [modalAtualizar, setModalAtualizar] = useState(false);
  const [modalDeletar, setModalDeletar] = useState(false);

  const [atividades, setAtividades] = useState([]);
  const [atividadeUpload, setAtividadeUpload] = useState({});

  useEffect(() => {
    _handleLoad();
  }, []);

  const _handleLoad = () => {
    post("/usuario/atividade/busca", { busca: {}, from: "web" })
      .then((res) => {
        console.log("Resposta Busca Atividades", res);
        const ativList = [];
        res.map((atv) => {
          return ativList.push({
            ...atv,
            username: atv.usuario.username,
            realizado: atv.realizado ? "Sim" : "Não",
            data_treino: moment(atv.data_treino).format("DD/MM/YYYY"),
            data: moment(atv.created_at).format("DD/MM/YYYY HH:mm"),
          });
        });
        setAtividades(ativList);
      })
      .catch((err) => {
        console.log("Erro Busca Atividades", JSON.stringify(err));
      });
  };

  const _handleDelete = () => {
    console.log(atividadeUpload);
    remove("/usuario/atividade/delete", { id: atividadeUpload.id })
      .then((res) => {
        if (res) {
          setModalDeletar(false);
          _handleLoad();
        }
      })
      .catch((err) => alert(err.response.data.message));
  };

  return (
    <>
      <Novo open={modalNovo} setOpen={setModalNovo} refresh={_handleLoad} />
      {/* <Atualizar
        item={atividadeUpload}
        open={modalAtualizar}
        setOpen={setModalAtualizar}
        refresh={_handleLoad}
      /> */}
      <Deletar
        open={modalDeletar}
        setOpen={setModalDeletar}
        title={"Deletando Atividade"}
        message={`Deseja mesmo deletar a atividade do dia ${atividadeUpload.data} para o usuario ${atividadeUpload.username} ?`}
        actionYes={_handleDelete}
        actionNot={() => {
          setModalDeletar(false);
        }}
      />

      <Paper square>
        <Grid container>
          <Grid item xs={12} md={12} lg={12}>
            <TableComponent
              top={true}
              title={
                <Grid container>
                  <Grid item>
                    <Box pr={4}>
                      <Typography variant="h2">Atividades</Typography>
                    </Box>
                  </Grid>

                  <Grid item>
                    <ButtonSuccess
                      color="primary"
                      onClick={() => setModalNovo(true)}
                    >
                      <AddIcon /> Nova Atividade
                    </ButtonSuccess>
                  </Grid>
                </Grid>
              }
              columns={colunas}
              data={atividades}
              actions={[
                (rowData) => ({
                  icon: () => <Delete />,
                  tooltip: "Remover Linha",
                  onClick: () => {
                    setAtividadeUpload(rowData);
                    setModalDeletar(true);
                  },
                }),
              ]}
              handleDetails={(obj) => (
                <Visualizar
                  titulo={obj.titulo}
                  username={obj.username}
                  treinos={obj.treinos}
                  agendado={obj.data_treino}
                  realizado={obj.realizado}
                  data_realizado={moment(obj.data_realizado).format(
                    "DD/MM/YYYY"
                  )}
                  dif_esperada={obj.dificuldade_esperada}
                  dif_sentida={obj.dificuldade_sentida}
                  comentario={obj.comentario}
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

export default Atividade;
