import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router";
import App from "../App";
import Edit from "./Edit";
const AppRouter: React.FC = () => {
  return (
    <Router>
      <App></App>
    </Router>
  );
};
export default AppRouter;
