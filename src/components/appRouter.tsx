import * as React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import App from "../App";

import Login from '../pages/logincomponent'
import Register from "../pages/registercomponent";
import Dashboard from "../pages/dashboardcomponent";


import New from "../pages/new";
import { Component } from 'react';
import ActivityLog from "../pages/activity";
import ProjectEditComponent from "../pages/projecteditcomponent";
import InfoProjectComponent from "../pages/infoprojectcomponent"
import Reports from "../pages/Reports";

const AppRouter: React.FC = () => {
 

  return (
    <Router>
      <App>
      
         <Route exact path="/" component={Login} />
  <Route exact path="/register" component={Register}/>     
  <Route path="/dash" component={Dashboard} />
  <Route exact path="/activity" component={ActivityLog} />
  <Route exact path="/projecteditcomponent" component={ProjectEditComponent} />
  <Route exact path="/infoprojectcomponent" component={InfoProjectComponent} />
  <Route exact path="/reports" component={Reports} />

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
