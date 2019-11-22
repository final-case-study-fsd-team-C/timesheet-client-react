import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import logo from "../asset/img/logo.png";
import Toolbar from "@material-ui/core/Toolbar";
import AddIcon from "@material-ui/icons/Add";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Fab from "@material-ui/core/Fab";
import RegisterTimeModal from "./registertimemodal";
import { IconButton, Grid, Button, Menu, MenuItem } from "@material-ui/core";
import TimerModal from "./timercomponent";
import TimerPaper from "./timerpaper";
import { IProjectInfo } from "../model/project";
import { IPhasesInfo } from "../model/phases";
import { IClientInfo } from "../model/clients";
import { IProjectTimeSheet } from "../model/timesheet";
import auth0Client from "../services/auth0";
import { RouteComponentProps, withRouter } from "react-router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1
    },
    appBar: {
      paddingTop: 0
    },
    fabButton: {
      position: "absolute",
      zIndex: 1,
      top: 20,
      left: 0,
      right: 0,
      margin: "0 auto"
    },
    timer: {
      position: "relative",
      marginRight: 18,
      width: 200
    }
  })
);
interface IAppBarProps {
  setTimer: (
    hours: number,
    minutes: number,
    timesheet: { id: number; project: string; phase: string },
    timer: boolean
  ) => void;
  openTimer: boolean;
  hrs: number;
  min: number;
  timesheet: { id: number; project: string; phase: string };
  project: IProjectInfo[];
  phases: IPhasesInfo[];
  clients: IClientInfo[];
  timeSheet: IProjectTimeSheet[];
  clientData: () => void;
  projectData: () => void;
  phaseData: () => void;
  timesheetData: () => void;
  timerId: number;
  projData: string;
  phase: string;
  note: string;
  hour: number;
  minute: number;
  date: string;
  editTimerOpen: boolean;
  openTimerEdit: () => void;
  closeEditTimer: () => void;
  closeTimer: () => void;
}
const AppBarComponent: React.FC<IAppBarProps> = (props: IAppBarProps) => {
  const classes = useStyles();
  const [open2, setOpen2] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [loadingTimer, setLoadingTimer] = React.useState(false);
  const open = Boolean(anchorEl);
  const [name, setName] = React.useState(
    sessionStorage.getItem("name") === null
      ? ""
      : sessionStorage.getItem("name")
  );

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const logout = () => {
    auth0Client.logout();
    login();
  };

  const login = () => {
    if (!auth0Client.isAuthenticated()) {
      auth0Client.signIn();
    }
  };

  React.useEffect(() => {
    setLoadingTimer(true);
    setTimeout(() => {
      setName(sessionStorage.getItem("name"));
      setLoadingTimer(false);
    }, 5000);
  }, []);

  console.log(props.project);
  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar>
        <img
          src={logo}
          style={{ marginLeft: 25 }}
          width="48"
          height="48"
          alt="logo"
        ></img>
        <Grid
          container
          alignItems="center"
          style={{ color: "white", width: 200, fontWeight: 550, fontSize: 24 }}
        >
          {" "}
          <div style={{ fontFamily: "Helvetica", marginLeft: 35 }}>
            {" "}
            TIMESEA{" "}
          </div>{" "}
        </Grid>
        <Fab
          color="secondary"
          aria-label="add"
          className={classes.fabButton}
          onClick={props.openTimerEdit}
        >
          <AddIcon />
        </Fab>

        <div className={classes.grow} />
        {props.openTimer ? (
          <IconButton color="inherit" className={classes.timer}>
            <TimerPaper
              hrs={props.hrs}
              minutes={props.min}
              timesheet={props.timesheet}
              closeTimer={props.closeTimer}
            />
          </IconButton>
        ) : null}
        <IconButton color="inherit">
          <TimerModal
            data={props.timeSheet}
            open={open2}
            handleClose={handleClose2}
          ></TimerModal>
        </IconButton>
        <IconButton color="inherit">
          <CheckCircleOutlineIcon
            onClick={handleOpen2}
          ></CheckCircleOutlineIcon>
        </IconButton>
        {sessionStorage.getItem("name") === null ? (
          <Button color="inherit" onClick={login}>
            {loadingTimer ? "Loading..." : "Login"}
          </Button>
        ) : (
          <div>
            <Button color="inherit" onClick={handleMenu}>
              {loadingTimer ? "Loading..." : name}
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
      <RegisterTimeModal
        clientData={props.clientData}
        projectData={props.projectData}
        phaseData={props.phaseData}
        timesheetData={props.timesheetData}
        open={props.editTimerOpen}
        handleClose={props.closeEditTimer}
        buttonClicked={props.setTimer}
        project={props.project}
        clients={props.clients}
        phases={props.phases}
        timeSheet={props.timeSheet}
        timerId={props.timerId}
        projData={props.projData}
        phase={props.phase}
        note={props.note}
        hour={props.hour}
        minute={props.minute}
        date={props.date}
      ></RegisterTimeModal>
    </AppBar>
  );
};
export default AppBarComponent;
