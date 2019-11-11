import * as React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import App from "../App";
import Client from '../pages/client';
import Login from '../pages/logincomponent';
import Register from "../pages/registercomponent";
import Dashboard from "../pages/dashboardcomponent";


import New from "../pages/new";
import { Component } from 'react';


const AppRouter: React.FC = () => {
 

  return (
    <Router>
      <App>
      
  <Route exact path="/" component={Login} />
  <Route exact path="/register" component={Register}/>     
  <Route path="/dash" component={Dashboard} />
  <Route exact path="/clients" component={Client} />
  
  <Route
    path="/dash"
    render={({ match: { url } }) => (
      <>
        
        <Route path={`${url}`} component={New} />
        
      </>
    )}
  />

  
      </App>
       
    </Router>
  );
};
export default AppRouter;
