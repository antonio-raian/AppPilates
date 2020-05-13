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
  { title: "Exercício", field: "exercicioname" },
  { title: "Repetições", field: "repeticoes" },
  { title: "Nº de Séries", field: "qtd_series" },
  { title: "Ativo", field: "ativo" },
  { title: "Criado em", field: "data" },
];
const Treino = () => {
  const [modalNovo, setModalNovo] = useState(false);
  const [modalAtualizar, setModalAtualizar] = useState(false);
  const [modalDeletar, setModalDeletar] = useState(false);

  const [treinos, setTreinos] = useState([]);
  const [treinoUpload, setTreinoUpload] = useState({});

  useEffect(() => {
    _handleLoad();
  }, []);

  const _handleLoad = () => {
    post("/treino/busca", {})
      .then((res) => {
        console.log("Resposta Busca Treinos", res);
        const treinoList = [];
        res.map((trei) => {
          return treinoList.push({
            ...trei,
            exercicioname: trei.exercicio.nome,
            ativo: trei.ativo ? "Ativo" : "Removido",
            data: moment(trei.created_at).format("DD/MM/YYYY HH:mm"),
          });
        });
        setTreinos(treinoList);
      })
      .catch((err) => {
        console.log("Erro Busca Exercicios", JSON.stringify(err));
      });
  };

  const _handleDelete = () => {
    console.log(treinoUpload);
    remove("/treino/delete", { id: treinoUpload.id })
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
        item={treinoUpload}
        open={modalAtualizar}
        setOpen={setModalAtualizar}
        refresh={_handleLoad}
      />
      <Deletar
        open={modalDeletar}
        setOpen={setModalDeletar}
        title={"Deletando Treino"}
        message={`Deseja Mesmo deletar o treino: Exercicio - ${treinoUpload.exercicioname}, Criado em ${treinoUpload.data} ?`}
        actionYes={_handleDelete}
        actionNot={() => {
          setModalDeletar(false);
        }}
      />

      <Paper square>
        <Grid container style={{}}>
          <Grid item md={12} lg={12}>
            <TableComponent
              top={true}
              title={
                <Grid container>
                  <Grid item>
                    <Box pr={4}>
                      <Typography variant="h2">Treinos</Typography>
                    </Box>
                  </Grid>

                  <Grid item>
                    <ButtonSuccess
                      color="primary"
                      onClick={() => setModalNovo(true)}
                    >
                      <AddIcon /> Novo Treino
                    </ButtonSuccess>
                  </Grid>
                </Grid>
              }
              columns={colunas}
              data={treinos}
              actions={[
                (rowData) => ({
                  icon: () => <Edit />,
                  tooltip: "Editar Linha",
                  onClick: () => {
                    setTreinoUpload(rowData);
                    setModalAtualizar(true);
                  },
                }),
                (rowData) => ({
                  icon: () => <Delete />,
                  tooltip: "Remover Linha",
                  onClick: () => {
                    setTreinoUpload(rowData);
                    setModalDeletar(true);
                  },
                }),
              ]}
              handleDetails={(obj) => (
                <Visualizar
                  exercicio={obj.exercicio}
                  repeticoes={obj.repeticoes}
                  series={obj.qtd_series}
                  intervalo={obj.intervalo}
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

export default Treino;
