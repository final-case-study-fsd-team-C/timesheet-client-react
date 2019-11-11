import React from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { EditorFormatAlignRight } from 'material-ui/svg-icons';
import { Grid } from '@material-ui/core';

class WorkspaceSetting extends React.Component<RouteComponentProps> {
    constructor(props: any){
      super(props);
      this.state={
          currency:'',
          wname:''
      }
    }
     
    render() {
        return (
            
          <div>
            <MuiThemeProvider>
                <br/><br/>
            <h3 style = {{textAlign: "center"}}>  Workspace Settings </h3>
            <div>
                <Grid container spacing = {2}>
                    <Grid item xs = {2} style = {{float: "left"}}></Grid>
                <Grid item xs = {4}>
               <div>
                   <h4>Currency</h4>
                   <span style = {{fontSize: "11px"}}>Set up the currency symbol for reports and data exports in<br/> your billable projects.</span>
               </div>
               <div style = {{}}><TextField
                 hintText="Currency used"
                 floatingLabelText="Currency"
                 onChange = {(event,newValue) => this.setState({currency:newValue})}
                 />
                 </div>
                 </Grid>
               <Grid item xs = {4}>
               <div>
                   <h4>Name</h4>
                   <span style = {{fontSize: "11px"}}>Choose the name that will be displayed for this workspace.</span>
               </div>
                 <TextField
                   hintText="Enter workspace name"
                   floatingLabelText="Workspace name"
                   onChange = {(event,newValue) => this.setState({wname:newValue})}
                   />
                
                 </Grid>
                 <Grid item xs = {2} style = {{float: "right"}}></Grid>
                 <Grid item xs = {12}><br/><br/>
                 <Link to="/dash" className="text-white"><RaisedButton label="Save" primary={true} style={style}  /></Link>   
                 </Grid>                 
                 </Grid>    
             </div>
             
             </MuiThemeProvider>
          </div>
        
          );
        }
    
     
}
 
const style = {
    margin: 15,
};

export default withRouter(WorkspaceSetting);