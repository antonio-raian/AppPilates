import React from "react";

import { routes } from "./index";
import PrivateRoute from "../PrivateRoute";

const Routes = () => {
  return routes
    .filter((route) => route.show)
    .map((route) => {
      return (
        <PrivateRoute exact path={route.path} component={route.component} />
      );
    });
};

export default Routes;
