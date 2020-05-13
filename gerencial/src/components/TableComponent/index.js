import React, { forwardRef } from "react";
import MaterialTable from "material-table";
import {
  AddBox,
  ArrowDownward,
  DeleteOutline,
  ChevronRight,
  Edit,
  FirstPage,
  LastPage,
  ChevronLeft,
  Clear,
  Search,
  Remove,
  ViewColumn,
  Delete,
} from "@material-ui/icons";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const TableComponent = (props) => {
  const { title, columns, data, actions, handleDetails, top } = props;

  return (
    <MaterialTable
      title={title}
      icons={tableIcons}
      columns={columns}
      data={data}
      detailPanel={(rowData) => {
        return handleDetails(rowData);
      }}
      onRowClick={(event, rowData, togglePanel) => togglePanel()}
      actions={actions}
      options={{
        actionsColumnIndex: -1,
        sorting: true,
        defaultSort: "desc",
        toolbar: top,
      }}
      localization={{
        body: { emptyDataSourceMessage: "Não há dados para exibir!" },
        toolbar: { searchPlaceholder: "Busca" },
        header: { actions: "Ações" },
        pagination: {
          labelRowsSelect: "Itens",
          labelRowsPerPage: "Linhas por pág.",
          firstTooltip: "Primeira Página",
          previousTooltip: "Página Anterior",
          nextTooltip: "Próxima Página",
          lastTooltip: "Última Página",
        },
      }}
    />
  );
};

export default TableComponent;
