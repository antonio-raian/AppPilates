import React, { useState, useEffect } from "react";
import { Grid, Typography, Paper, Box } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import TableComponent from "../../components/TableComponent";
import { ButtonSuccess } from "./styled";
import Novo from "./Novo";
import Atualizar from "./Atualizar";
import { post, remove } from "../../services/Requests";
import Visualizar from "./Visualizar";
import Deletar from "../../components/Deletar";
import { Edit } from "@material-ui/icons";

const colunas = [
  { title: "Usuário", field: "username" },
  { title: "Categoria", field: "categorianame" },
  { title: "Situação", field: "situacao" },
];

const Usuario = () => {
  const [modalNovo, setModalNovo] = useState(false);
  const [modalAtualizar, setModalAtualizar] = useState(false);
  const [modalDeletar, setModalDeletar] = useState(false);

  const [usuarios, setUsuarios] = useState([]);
  const [userUpload, setUserUpload] = useState({});

  const categoria = JSON.parse(localStorage.getItem("categoria"));
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    _handleLoad();
  }, []);

  const _handleLoad = () => {
    setUserUpload({});
    post("/usuario/busca", {})
      .then((res) => {
        console.log("Resposta Busca Usuarios", res);
        const renderUser = [];
        res.map((u) => {
          if (u.categoria.nivel >= categoria.nivel && user.id !== u.id)
            return renderUser.push({
              id: u.id,
              username: u.username,
              categoria_id: u.categoria.id,
              categorianame: u.categoria.nome,
              categoriadesc: u.categoria.descricao,
              situacao: u.situacao,
              data: u.created_at,
            });
        });
        setUsuarios(renderUser);
      })
      .catch((err) => {
        console.log("Erro Busca Usuarios", JSON.stringify(err));
      });
  };

  return (
    <>
      <Novo open={modalNovo} setOpen={setModalNovo} refresh={_handleLoad} />
      <Atualizar
        user={userUpload}
        open={modalAtualizar}
        setOpen={setModalAtualizar}
        refresh={_handleLoad}
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
                      <Typography variant="h2">Usuários</Typography>
                    </Box>
                  </Grid>

                  <Grid item>
                    <ButtonSuccess
                      color="primary"
                      onClick={() => setModalNovo(true)}
                    >
                      <AddIcon /> Novo Usuário
                    </ButtonSuccess>
                  </Grid>
                </Grid>
              }
              columns={colunas}
              data={usuarios}
              actions={[
                (rowData) => ({
                  icon: () => <Edit />,
                  tooltip: "Editar Linha",
                  onClick: () => {
                    setUserUpload(rowData);
                    setModalAtualizar(true);
                  },
                }),
              ]}
              handleDetails={(obj) => (
                <Visualizar
                  username={obj.username}
                  categoria={{
                    nome: obj.categorianame,
                    descricao: obj.categoriadesc,
                  }}
                  situacao={obj.situacao}
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

export default Usuario;
