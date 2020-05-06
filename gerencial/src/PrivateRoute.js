import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./context/auth";
import DashBoardLayout from "./layouts/DashboardLayout";

function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <DashBoardLayout>
            <Component {...props} />
          </DashBoardLayout>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}

export default PrivateRoute;
