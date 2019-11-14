import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


import React from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';






class Login extends React.Component<RouteComponentProps> {
constructor(props: any){
  super(props);
  this.state={
  username:'',
  password:''
  }
  
  
 }
 
render() {
    return (
      <div >
        <MuiThemeProvider>
          <div>
          
           <h1>  Login </h1>
           
           <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <Link to="/dash" className="text-white"><RaisedButton label="Submit" primary={true} style={style}  /></Link>

             
         </div>
         <span>
                New to here?{" "}
                <Link to="/register" className="text-white">
                  Register
                </Link>
                </span>
         
         </MuiThemeProvider>
      </div>
    
      );
    }

 
  }
const style = {
 margin: 15,
};


// onClick={(event) => this.handleClick(event)}
export default withRouter(Login);