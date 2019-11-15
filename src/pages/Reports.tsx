import React from 'react'; 
import { Grid, Box, Typography, Card, CardActionArea, CardContent, makeStyles } from '@material-ui/core';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import PersonIcon from '@material-ui/icons/Person';
import CategoryIcon from '@material-ui/icons/Category';
import CreateIcon from '@material-ui/icons/Create';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles3 = makeStyles({
    card: {
      height:100,
      '&:hover': {
        backgroundColor: "#dfede3",
      },      
      }});


export default function Reports(){

    const cards= useStyles3();

    return (
    <Grid container > 
        <Grid container xs={12}>
            <Box marginLeft={10} marginTop={5} marginBottom={5}> <Typography variant="h5" component="h5">
                 Personal Reports
                </Typography> 
            </Box>

        </Grid>
        <br/>

<Grid item xs ={3}>
     <Box marginLeft={10}>
        <Card className={cards.card} >
     <CardContent>
        {<FolderOpenIcon />} <br></br>
           Project
     </CardContent>

</Card>
</Box>
</Grid>
<Grid item xs ={3}>

<Card className={cards.card} >

<CardContent>
{<PersonIcon />} <br></br>

Me
</CardContent>
</Card>
</Grid>
<Grid item xs ={3} >  
<Card className={cards.card}>
<CardContent>
{<CategoryIcon />} <br></br>

    Phase Categories
</CardContent>
</Card>
</Grid>


<Grid item xs ={3}  >
    <Box marginRight={10}>
   <Card className={cards.card}>
       <CardContent>
       {<CreateIcon />} <br></br>

            Custom
       </CardContent>
    
  </Card>
  </Box>
</Grid>    
</Grid>
)
}
