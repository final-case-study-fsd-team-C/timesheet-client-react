import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Grid, TextField, Box, Paper, Divider, Select, FormControl, InputLabel, MenuItem, makeStyles, Theme } from "@material-ui/core";
 
 
class InfoProjectComponent extends React.Component<RouteComponentProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      pname: "",
      description: "",
      client: "",
      budget: "",
      recurrence: ""
    };
  }
 
  render() {
 
    return (
 
      <Box px={10}>
         
          <Paper>
          <Box p={1}>
          <Grid container direction="row">            
            <Grid item xs={4} >
           
              <Box m={2} textAlign="left">
                Basic Info
                <br/>
                <span style={{ fontSize: "12px" }}>
                  Set a name and a description for your project.
                </span>
              </Box>
               
            </Grid>
            <Grid item xs = {4}>
               
                <TextField
                  id="standard-basic"
                  label="Name"
                  margin="normal"
                  style={{width: "300px"}}
                  onChange={event =>
                    this.setState({ pname: event.target.value })
                  }
                /> <br/>
               
                <TextField
                  id="standard-basic"
                  label="Description"
                  margin="normal"
                  style={{width: "300px"}}
                  onChange={event =>
                    this.setState({ description: event.target.value })
                  }
                />
               
            </Grid>
          </Grid>
          <br/><br/>
          <Divider />
          <Grid container direction="row">
            <Grid item xs={4}>
             
            <Box m={2} textAlign="left">
                Additional Info
                <br/>
                <span style={{ fontSize: "12px" }}>
                  Set up a client, a budget and the budget recurrence for the project.
                </span>
                </Box>
               
            </Grid>
            <Grid item xs = {4}>
             
              <TextField
                id="standard-basic"
                label="Client"
                margin="normal"
                style={{width: "300px"}}
                onChange={event => this.setState({ client: event.target.value })}
              /> <br/>
 
              <TextField
                id="standard-basic"
                label="Budget"
                margin="normal"
                style={{width: "300px"}}
                onChange={event => this.setState({ budget: event.target.value })}
              /> <br/> <br/>
 
              <FormControl>
                <InputLabel>Recurrence</InputLabel>
                <Select
                id="demo-simple-select"
                style={{width: "300px"}}
                >
                <MenuItem value={10}>Weekly</MenuItem>
                <MenuItem value={20}>Monthly</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>  
          <br/><br/>  
          </Box>
          </Paper>
        </Box>
    );
  }
}
 
 
export default withRouter(InfoProjectComponent);