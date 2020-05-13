import React from "react";
import {
  Dashboard,
  Group,
  FitnessCenter,
  Timer,
  EventNote,
} from "@material-ui/icons";

import Home from "../pages/Home";
import Usuario from "../pages/Usuario";
import Exercicio from "../pages/Exercicio";
import Treino from "../pages/Treino";
import Atividade from "../pages/Atividade";

const HOME_ROUTE = {
  id: "Home",
  path: "/home",
  header: "Menu",
  icon: <Dashboard />,
  containsHome: true,
  component: Home,
  children: null,
  show: true,
};

const USUARIOS_ROUTE = {
  id: "Usuarios",
  path: "/usuario",
  icon: <Group />,
  component: Usuario,
  children: null,
  show: true,
};

const EXERCICIOS_ROUTE = {
  id: "Exercicios",
  path: "/exercicios",
  icon: <FitnessCenter />,
  component: Exercicio,
  children: null,
  show: true,
};

const TREINO_ROUTE = {
  id: "Treinos",
  path: "/treinos",
  icon: <Timer />,
  component: Treino,
  children: null,
  show: true,
};

const ATIVIDADE_ROUTE = {
  id: "Atvidades",
  path: "/atividades",
  icon: <EventNote />,
  containsHome: true,
  component: Atividade,
  children: null,
  show: true,
};

export const routes = [
  HOME_ROUTE,
  USUARIOS_ROUTE,
  EXERCICIOS_ROUTE,
  TREINO_ROUTE,
  ATIVIDADE_ROUTE,
];
