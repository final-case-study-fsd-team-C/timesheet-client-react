import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import React from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CategoryIcon from '@material-ui/icons/Category';


class Phase extends React.Component<RouteComponentProps> {
constructor(props: any){
  super(props);
  this.state={
  color:'',
  name:'',
  phases:''
  }
  
  
 }
 
render() {
    return (
      
       <div>
           <MuiThemeProvider> 
            <Grid container spacing={3}>
         
            <Grid item xs={6}>
            
            <div> <h1> <CategoryIcon/> Manage Phase Categories </h1> </div>
            </Grid> 

            <Grid item xs={6}>
          <div style={{marginLeft: 'auto'}}>
              <Button variant="contained"  >
                Add New
            </Button></div> 
            </Grid>
           </Grid>
            
            <br/>
            <Table >
<TableHead>
  <TableRow>
    <TableCell>Color</TableCell>
    <TableCell align="right">Name</TableCell>
    <TableCell align="right">Phases</TableCell>
    <TableCell align="right">Delete</TableCell>
    
  </TableRow>
</TableHead>
<TableBody>
          
            <TableRow >
              <TableCell >
               
              </TableCell>
              <TableCell align="right"><TextField
               hintText="Design"
               floatingLabelText="Design"
               onChange = {(event,newValue) => this.setState({name:newValue})}
               /></TableCell>
              <TableCell align="right">1</TableCell>
              <TableCell align="right"><button><DeleteForeverIcon/></button></TableCell>
              
            </TableRow>
        
        </TableBody>
      </Table>
            
             <Link to="/" className="text-white"><RaisedButton label="Save" primary={true}   /></Link>
             </MuiThemeProvider>
             </div>
         
         
         
         
     
    
      );
    }
   
 
  }

export default withRouter(Phase);