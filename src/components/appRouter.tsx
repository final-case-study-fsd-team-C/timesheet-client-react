import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "../App";

import Login from '../pages/logincomponent'
import Register from "../pages/registercomponent";
import Dashboard from "../pages/dashboardcomponent";




const AppRouter: React.FC = () => {
 

  return (
    <Router>
      <App>  
   
  <Route exact path="/" component={Login} />
  <Route exact path="/register" component={Register}/>     
  <Route path="/dash" component={Dashboard} />
  
 

  
      </App>
       
    </Router>
  );
};
export default AppRouter;
