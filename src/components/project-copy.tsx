import React, { ChangeEvent } from "react";
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
  DialogTitle,
  FormControl,
  Select,
  TableBody
} from "@material-ui/core";
import { Grid } from "@material-ui/core";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import history from "../services/history";

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
      width: 700,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      height: 400
    },
    paper1: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    }
  })
);
const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  })
);
function createData(
  name: string,
  client: string,
  budget: number,
  billable: number,
  time: number
) {
  return { name, client, budget, billable, time };
}

const rows = [createData("Demo Project With Budget", "AT&T", 25000, 3523, 159)];

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
function Projects() {
  const classes = useStyles();
  const classes1 = useStyles1();
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
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClose1 = () => {
    setOpenOne(false);
  };
  const handleClose2 = () => {
    setOpenMultiple(false);
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
            <FormControl variant="filled" className={classes1.formControl}>
              <InputLabel id="demo-simple-select-filled-label">
                select
              </InputLabel>
              <Select labelId="demo-simple-select-filled-label" id="search">
                {client.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={2}>
            <FormControl variant="filled" className={classes1.formControl}>
              <InputLabel id="demo-simple-select-filled-label">
                select
              </InputLabel>
              <Select labelId="demo-simple-select-filled-label" id="search">
                {show.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
                <Paper style={modalStyle} className={classes.paper1}>
                  <Grid container spacing={2} direction="row">
                    <Grid item xs={6} style={{ float: "left" }}>
                      <Grid
                        container
                        spacing={1}
                        direction="row"
                        alignItems="center"
                      >
                        <FolderOpenIcon />
                        <b>Manage Phases</b>
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
            <FormControl variant="filled" className={classes1.formControl}>
              <InputLabel id="demo-simple-select-filled-label">
                select
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="search"
                onChange={(e: ChangeEvent<any>) => {
                  handleOpen1(e.target.value);
                }}
              >
                {newproject.map((op, i) => (
                  <MenuItem key={i} value={op.option}>
                    {op.label}
                  </MenuItem>
                ))}
              </Select>

              <Modal open={openMultiple} onClose={handleClose2}>
                <Paper style={modalStyle} className={classes.paper}>
                  <Grid container spacing={2} direction="row">
                    <Grid item xs={2}>
                      <Grid
                        container
                        spacing={1}
                        direction="row"
                        alignItems="center"
                      >
                        <FolderOpenIcon />
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <b>Manage multiple Projects</b>
                    </Grid>

                    <Grid item xs={4} style={{ float: "right" }}>
                      <Grid
                        container
                        spacing={1}
                        direction="row"
                        justify="flex-end"
                      >
                        <Button className="addnew" variant="contained">
                          {" "}
                          Add New
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Table>
                    <TableHead>
                      <TableCell>Name</TableCell>
                      <TableCell>Template</TableCell>
                      <TableCell>Group</TableCell>
                      <TableCell>Client</TableCell>
                    </TableHead>
                    <TableRow>
                      <TableCell>
                        <TextField label="Name of the project"></TextField>
                      </TableCell>

                      <TableCell>
                        <FormControl variant="filled">
                          <InputLabel></InputLabel>
                          <Select className="dropdown"></Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <FormControl variant="filled">
                          <InputLabel id="demo-simple-select-filled-label"></InputLabel>
                          <Select className="dropdown"></Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <FormControl variant="filled">
                          <InputLabel id="demo-simple-select-filled-label"></InputLabel>
                          <Select className="dropdown"></Select>
                        </FormControl>
                      </TableCell>
                    </TableRow>
                  </Table>

                  <Paper style={{ float: "right" }}>
                    <Button className="save">Save</Button>
                  </Paper>
                </Paper>
              </Modal>
            </FormControl>
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
            <TableBody>
              {rows.map(row => (
                <TableRow
                  key={row.name}
                  hover
                  onClick={e => {
                    history.push("/Edit");
                  }}
                >
                  <TableCell>
                    <Checkbox></Checkbox>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.client}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.budget}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.billable}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.time}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </div>
    </Paper>
  );
}

export default Projects;
