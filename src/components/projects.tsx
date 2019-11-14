import React from "react";
import {
  Button,
  TextField,
  MenuItem,
  Paper,
  TableHead,
  Table,
  TableRow,
  TableCell,
  Checkbox,
  Dialog,
  InputAdornment,
  Input,
  InputLabel,
  DialogTitle
} from "@material-ui/core";
import { Grid } from "@material-ui/core";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    }
  })
);

const client = [
  {
    value: "all clients",
    label: "All Clients"
  },
  {
    value: "no client",
    label: "No Client"
  }
];
const show = [
  {
    value: "all active projects",
    label: "All Active Projects"
  },
  {
    value: "all archive projects",
    label: "All Archive Projects"
  }
];
const newproject = [
  {
    value: "create new project",
    label: "Create New Project",
    option: "one"
  },
  {
    value: "manage new project",
    label: "Manage New Project",
    option: "multiple"
  }
];
function Project() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [openOne, setOpenOne] = React.useState(false);
  const [openMultiple, setOpenMultiple] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpen1 = (option: string) => {
    if (option === "one") setOpenOne(true);
    else setOpenMultiple(true);
    console.log(option);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClose1 = () => {
    setOpenOne(false);
  };

  return (
    <Paper style={{ margin: 40, height: 400 }}>
      <div className="grid-container">
        <Grid container spacing={3}>
          <Grid item xs={2}>
            <div className="search">
              <TextField label="Search" margin="normal"></TextField>
            </div>
          </Grid>

          <Grid item xs={2}>
            <TextField
              id="search"
              select
              label="Client"
              value={client}
              margin="normal"
            >
              {client.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="search"
              select
              label="Show"
              value={show}
              margin="normal"
            >
              {show.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={2}>
            <div className="phases">
              <Button className="btn" onClick={handleOpen}>
                Phases
              </Button>
              <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
              >
                <Paper style={modalStyle} className={classes.paper}>
                  <Grid container spacing={2} direction="row">
                    <Grid item xs={6} style={{ float: "left" }}>
                      <Grid
                        container
                        spacing={1}
                        direction="row"
                        alignItems="center"
                      >
                        <FolderOpenIcon />
                        <b>Manage Projects</b>
                      </Grid>
                    </Grid>

                    <Grid item xs={6} style={{ float: "right" }}>
                      <Grid
                        container
                        spacing={1}
                        direction="row"
                        justify="flex-end"
                      >
                        <InputLabel htmlFor="input-with-icon-adornment"></InputLabel>
                        <Input
                          id="input-with-icon-adornment"
                          startAdornment={
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} direction="row">
                    <Grid
                      item
                      xs={6}
                      style={{ float: "left" }}
                      alignItems="center"
                    >
                      <b>Name</b>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{ float: "right" }}
                      alignItems="center"
                    >
                      <b>Phases</b>
                    </Grid>
                  </Grid>
                </Paper>
              </Modal>
            </div>
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="search"
              select
              label="New Project"
              value={newproject}
              margin="normal"
            >
              {newproject.map((op, i) => (
                <MenuItem
                  key={i}
                  value={op.value}
                  onClick={e => {
                    handleOpen1(op.option);
                  }}
                >
                  {op.label}
                </MenuItem>
              ))}
            </TextField>
            <Modal open={openOne} onClose={handleClose1}>
              <Paper>
                <Grid container spacing={2} direction="row">
                  <Grid item xs={6} style={{ float: "left" }}>
                    <Grid
                      container
                      spacing={1}
                      direction="row"
                      alignItems="center"
                    >
                      <FolderOpenIcon />
                      <b>Manage Projects</b>
                    </Grid>
                  </Grid>

                  <Grid item xs={6} style={{ float: "right" }}>
                    <Grid
                      container
                      spacing={1}
                      direction="row"
                      justify="flex-end"
                    >
                      <Button> Add New</Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Table>
                  <TableRow>
                    <TableCell>Multiple new projects by Template</TableCell>
                    <TableCell>
                      <Button className="btn1">Add new </Button>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Template</TableCell>
                    <TableCell>Group</TableCell>
                    <TableCell>Client</TableCell>
                  </TableRow>
                </Table>
              </Paper>
            </Modal>
          </Grid>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox></Checkbox>
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Client</TableCell>
                <TableCell>Budget</TableCell>
                <TableCell>Billable</TableCell>
                <TableCell>Total Time</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </Grid>
      </div>
    </Paper>
  );
}

export default Project;
