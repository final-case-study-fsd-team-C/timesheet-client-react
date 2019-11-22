import React from "react";
import {
  Button,
  MenuItem,
  Paper,
  InputAdornment,
  InputLabel,
  FormControl,
  Input,
  Select,
  Divider,
  Typography
} from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import SearchIcon from "@material-ui/icons/Search";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import Checkbox from "@material-ui/core/Checkbox";
import { IProjectInfo } from "../model/project";
import { IClientInfo } from "../model/clients";
import { IProjectTimeSheet } from "../model/timesheet";
import { IPhasesInfo } from "../model/phases";
import EditIcon from "@material-ui/icons/Edit";
import history from "../services/history";
import CreateProjectModal from "./createprojectmodal";
import projectService from "../services/projectService";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 2),
      margin: theme.spacing(3, 2)
    },
    margin: {
      marginTop: theme.spacing(2)
    },
    formControl: {
      width: "100%"
    },
    buttonProject: {
      margin: theme.spacing(1)
    },
    table: {
      minWidth: 650,
      marginTop: theme.spacing(3)
    },
    tableRow: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2)
    },
    paper1: {
      position: "absolute",
      width: 600,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(4, 6, 6, 8),
      [theme.breakpoints.down("sm")]: {
        width: 300,
        height: 650
      }
    },
    time: {
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(2),
      width: "100%"
    },
    calender: {
      marginTop: theme.spacing(2),
      marginRight: theme.spacing(5),
      width: "100%"
    },
    button: {
      marginTop: theme.spacing(5),
      width: "100%"
    },
    note: {
      marginTop: theme.spacing(3),
      fontSize: 28,
      fontWeight: 600
    },
    grow: {
      flexGrow: 1
    },
    chips: {
      display: "flex",
      flexWrap: "wrap"
    },
    chip: {
      margin: 2
    },
    formControl1: {
      marginLeft: 12,
      marginTop: 5,
      width: "100%"
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    },
    button1: {
      fontSize: "small",
      width: 150
    },
    title: {
      fontSize: 20,
      fontWeight: 600
    },
    divider: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    }
  })
);

interface IProjectComponentProps {
  project: IProjectInfo[];
  phases: IPhasesInfo[];
  clients: IClientInfo[];
  timeSheet: IProjectTimeSheet[];
  clientData: () => void;
  projectData: () => void;
  phaseData: () => void;
  timesheetData: () => void;
  changeProjectState: (id: number, state: number) => void;
}
const ProjectComponent: React.FC<IProjectComponentProps> = (
  props: IProjectComponentProps
) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [openOne, setOpenOne] = React.useState(false);
  const [openMultiple, setOpenMultiple] = React.useState(false);
  const [selected, setSelected] = React.useState<string[]>([]);
  const [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [filteredProject, setFilteredProject] = React.useState(props.project);
  const [clientFilter, setClientFilter] = React.useState("");
  const [openProject, setOpenProject] = React.useState(false);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = props.project.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleOpen1 = (option: string) => {
    console.log(option);
    if (option === "one") setOpenOne(true);
    else setOpenMultiple(true);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const getTimeFromMins = (mins: number) => {
    // do not include the first validation check if you want, for example,
    // getTimeFromMins(1530) to equal getTimeFromMins(90) (i.e. mins rollover)
    console.log(mins);
    if (mins === 0) return "00:00";
    let h = (mins / 60) | 0,
      m = mins % 60 | 0;
    let hour = h < 10 ? "0" + h : h;
    let min = m < 10 ? "0" + m : m;
    let time = hour + ":" + min;
    return time;
  };

  const filterProject = (e: any) => {
    if (e.target.value !== "") {
      setFilteredProject(
        props.project.filter(
          proj =>
            proj.name
              .toLocaleLowerCase()
              .indexOf(e.target.value.toLocaleLowerCase()) !== -1
        )
      );
    } else {
      setFilteredProject(props.project);
    }
    setSearch(e.target.value);
  };

  const handleDeleteProject = () => {
    if (
      window.confirm(
        `Do you want to delete ${
          selected.length > 1 ? "these" : "this"
        } project? Any data related to this project will be deleted.`
      )
    ) {
      const deletedProject = selected.map(
        (proj: string) =>
          props.project.filter((p: IProjectInfo) => p.name === proj)[0]
      );
      const deletedProjectId = deletedProject.map((p: IProjectInfo) => p.id);
      const deletedTimesheet = props.timeSheet.filter(
        (time: IProjectTimeSheet) =>
          deletedProjectId.indexOf(time.project.id) !== -1
      );
      const deletedTimesheetId =
        deletedTimesheet.length === 0
          ? []
          : deletedTimesheet.map((time: IProjectTimeSheet) => time.id);
      const updatedClient = props.clients.map((client: IClientInfo) => ({
        ...client,
        noOfProjects:
          client.noOfProjects -
          deletedProject.filter((p: IProjectInfo) => p.clientId === client.id)
            .length
      }));
      console.log(
        deletedProject,
        deletedProjectId,
        deletedTimesheet,
        deletedTimesheetId,
        updatedClient
      );
      deletedProjectId.forEach(value => {
        projectService.deleteProject(value).subscribe((data: any) => {
          props.projectData();
          setSelected([]);
          console.log(data);
        });
      });
      deletedTimesheetId.forEach(value => {
        projectService
          .deleteTimesheetData(value)
          .subscribe(data => console.log(data));
      });
      updatedClient.forEach(value => {
        projectService
          .updateClient(value, value.id)
          .subscribe(data => console.log(data));
      });
    }
  };
  const filterProjectByClient = (e: any) => {
    e.target.value === "no"
      ? setFilteredProject(props.project.filter(proj => proj.clientId === -1))
      : e.target.value === "all"
      ? setFilteredProject(props.project)
      : setFilteredProject(
          props.project.filter(
            proj => proj.clientId === Number.parseInt(e.target.value)
          )
        );

    setClientFilter(e.target.value);
    console.log(props.project);
  };

  React.useEffect(() => {
    setFilteredProject(props.project);
  }, [props.project]);

  const openNewProject = () => {
    setOpenProject(true);
  };
  const handleCloseCreateProject = () => {
    setOpenProject(false);
  };

  return (
    <Paper className={classes.root}>
      {selected.length > 0 ? (
        <Grid container direction="row" alignItems="center" spacing={2}>
          <Grid item xs>
            <Typography color="inherit" variant="subtitle1">
              {selected.length} selected
            </Typography>
          </Grid>
          <Grid item xs>
            <Grid container direction="row" justify="flex-end">
              <Tooltip title="Delete">
                <IconButton aria-label="delete" onClick={handleDeleteProject}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid container direction="row" alignItems="center" spacing={4}>
          <Grid item xs>
            <FormControl fullWidth className={classes.margin}>
              <Input
                id="standard-adornment-amount"
                value={search}
                onChange={e => filterProject(e)}
                placeholder="Search"
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-simple">Client</InputLabel>
              <Select native onChange={e => filterProjectByClient(e)}>
                <optgroup label="">
                  <option value="no">No Selection</option>
                  <option value="all">All Client</option>
                </optgroup>
                <optgroup label="">
                  {props.clients.map((cl, key) => {
                    return (
                      <option value={cl.id} key={key}>
                        {cl.name}
                      </option>
                    );
                  })}
                </optgroup>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs></Grid>
          <Grid item xs>
            <ButtonGroup
              variant="contained"
              color="primary"
              ref={anchorRef}
              aria-label="split button"
            >
              <Button onClick={handleToggle}>New Project</Button>
              <Button
                color="primary"
                size="small"
                aria-controls={open ? "split-button-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-label="select merge strategy"
                aria-haspopup="menu"
                onClick={handleToggle}
              >
                <ArrowDropDownIcon />
              </Button>
            </ButtonGroup>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom"
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem onClick={openNewProject}>
                          Create a new project
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
            <CreateProjectModal
              clientData={props.clientData}
              projectData={props.projectData}
              phaseData={props.phaseData}
              timesheetData={props.timesheetData}
              project={props.project}
              phases={props.phases}
              timeSheet={props.timeSheet}
              clients={props.clients}
              openCreateProjectModal={openProject}
              handleClose={handleCloseCreateProject}
              classes={classes}
            ></CreateProjectModal>
          </Grid>
        </Grid>
      )}

      <Grid container direction="row">
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" className={classes.tableRow}>
                <Checkbox
                  indeterminate={
                    selected.length > 0 &&
                    selected.length < props.project.length
                  }
                  checked={selected.length === props.project.length}
                  onChange={handleSelectAllClick}
                  inputProps={{ "aria-label": "select all desserts" }}
                />
              </TableCell>
              <TableCell padding="checkbox" className={classes.tableRow}>
                <IconButton aria-label="edit">
                  <EditIcon />
                </IconButton>
              </TableCell>
              <TableCell align="left" className={classes.tableRow}>
                Name
              </TableCell>
              <TableCell align="left" className={classes.tableRow}>
                Client
              </TableCell>
              <TableCell align="left" className={classes.tableRow}>
                Total time
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProject.length === 0 &&
            props.clients.length === 0 &&
            props.timeSheet.length === 0
              ? ""
              : filteredProject.map((proj, index) => {
                  const isItemSelected = isSelected(proj.name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const clientName =
                    props.clients.filter(cl => cl.id === proj.clientId)
                      .length === 0
                      ? ""
                      : props.clients.filter(cl => cl.id === proj.clientId)[0]
                          .name;
                  const totalTime =
                    props.timeSheet.filter(time => time.project.id === proj.id)
                      .length === 0
                      ? 0
                      : props.timeSheet
                          .filter(time => time.project.id === proj.id)
                          .map(time => time.timeWorked)
                          .reduce((prev, curr) => prev + curr);
                  // console.log(
                  //   props.clients.filter(cl => cl.id === proj.clientId)[0].name
                  // );
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
                      <TableCell
                        padding="checkbox"
                        className={classes.tableRow}
                      >
                        <Checkbox
                          checked={isItemSelected}
                          onClick={event => handleClick(event, proj.name)}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        padding="checkbox"
                        className={classes.tableRow}
                      >
                        <IconButton aria-label="edit">
                          <EditIcon
                            onClick={e => {
                              history.push(`/dash/projects/edit/${proj.id}`);
                              props.changeProjectState(proj.id, 2);
                            }}
                          />
                        </IconButton>
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        align="left"
                        className={classes.tableRow}
                        onClick={e => {
                          history.push(`/dash/projects/details/${proj.id}`);
                          props.changeProjectState(proj.id, 1);
                        }}
                      >
                        {proj.name}
                      </TableCell>
                      <TableCell align="left" className={classes.tableRow}>
                        {clientName}
                      </TableCell>
                      <TableCell align="left" className={classes.tableRow}>
                        {getTimeFromMins(totalTime)}
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </Grid>
    </Paper>
  );
};

export default ProjectComponent;
