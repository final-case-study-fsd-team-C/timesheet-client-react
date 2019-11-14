import React from 'react'; 
import { Grid, Typography, makeStyles, Box, withStyles, Theme} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import FolderIcon from '@material-ui/icons/Folder';
import LinearProgress from '@material-ui/core/LinearProgress';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import TableRow from '@material-ui/core/TableRow';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {Card, CardContent, Paper, FormControl } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Link } from 'react-router-dom';



const useStyles = makeStyles({    
    root: {
      height: 10,
      backgroundColor: lighten('#ff6c5c', 0.5),
      borderRadius: 20,
    },
  })
  const useStyles3 = makeStyles({
    card: {
      minWidth: 275,
      margin: 14,
      '&:hover': {
        background: "#d3d3d3",
      }
      
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });


    export default function ProjectEditComponent(){
            const classes = useStyles();
            const cards= useStyles3();
    return (

 <Grid container>     
  <Grid item xs={6} container direction="row" justify="flex-start" alignItems="flex-start" >
     <Box mt={5} marginLeft={23} >
       <Typography variant="h3" component="h5">
        Project Name
       </Typography>
    </Box>
  </Grid>
  <Grid item xs={6} container direction="column-reverse" justify="flex-end" alignItems="flex-end" >
  <Box mt={5}>
    <Button
        size="large"
        variant="contained"
        color="default"
        style={{width: "75%", marginBottom: 12}}
        startIcon={<FolderIcon />}
      >
        Project Report
      </Button>
     <Button component={Link} to="/infoprojectcomponent" 
        size="large"
        variant="contained"
        color="primary"
        style={{width: "75%"}}
        startIcon={<EditIcon />}
  
      >
        Edit Project
      </Button>
      </Box>
  </Grid>
  <Grid container >  <Box marginLeft={23}> <Typography variant="h5" component="h5">
        Budget
      </Typography> </Box> </Grid>
  <Grid container xs={12} justify="flex-end" alignItems="flex-end">
      <Box width="85%" mt={1} marginRight={7} >    
      <LinearProgress className = {classes.root}
        variant="determinate"
        color="secondary"
        value={50}
      />
       </Box>
      

  </Grid>
  
<Grid container justify = "flex-end" alignItems="flex-end" item xs = {8} >
    <Grid item xs = {10}>

    <Card className={cards.card} style = {{height:300}}>
        <CardContent>
This is card content
        </CardContent>
    </Card>
    </Grid>
    </Grid>
    <Grid item xs={4}>

        <Grid container spacing ={3} justify= "center">
    <Grid item xs ={10}>

    <Card className={cards.card}>
    <CardActionArea>

        <CardContent>
Total Time
        </CardContent>
        </CardActionArea>
        </Card>
        </Grid>
        <Grid item xs ={10} >  
    <Card className={cards.card}>
      <CardActionArea>
        <CardContent>
Billable Time
        </CardContent>
        </CardActionArea>
        </Card>
      </Grid>
       

      <Grid item xs ={10}  >
    <Card className={cards.card}>
      <CardActionArea>
        <CardContent>
Billed Time
        </CardContent>
        </CardActionArea>
        </Card>
        </Grid>    
        </Grid>
        </Grid>
<Grid container item xs = {7} direction ="row" justify ="center" alignItems = "center">

    <Paper style = {{height:200,width:550}} >
        <Grid container spacing ={2} direction="row">

        <Grid container item xs = {6} alignItems = "center">
            
            Phases
        </Grid>
        <Grid container item xs = {6}  alignItems = "center" justify = "flex-end">
            
        <FormControl >
        <InputLabel id="demo-simple-select-label">Show</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          style = {{width:150}}
         
        >
          <MenuItem value={10}>Open Phases</MenuItem>
          <MenuItem value={20}>Archived Phases</MenuItem>
        </Select>
      </FormControl>
        </Grid>
      
        
    <Table>
            <TableRow>
                <TableCell>
                    Name
                </TableCell>
                <TableCell>
                    Budget
                </TableCell>
                <TableCell>
                    Total Time
                </TableCell>
            </TableRow>
            </Table>
            </Grid>     
            
    </Paper>
</Grid>

<Grid container item xs = {5} justify = "center">
    <Paper style = {{height:150,width:550}}>
       Members 
        <Table>
            <TableRow>
                <TableCell>
                    Name
                </TableCell>
                <TableCell>
                    Budget
                </TableCell>
                <TableCell>
                    Total Time
                </TableCell>
            </TableRow>
            </Table>
    </Paper>
</Grid>
</Grid>
    )
    }
    
    
   
