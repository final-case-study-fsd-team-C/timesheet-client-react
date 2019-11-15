import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";

import Toolbar from "@material-ui/core/Toolbar";

import AddIcon from "@material-ui/icons/Add";
import TimerIcon from "@material-ui/icons/Timer";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

import Fab from "@material-ui/core/Fab";

import RegisterTimeModal from "./registertimemodal";
import { IconButton } from "@material-ui/core";
import EnteriesModal from "./enteriesmodal";
import TimerModal from "./timercomponent";
import TimerPaper from "./timerpaper";

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
      marginLeft: 0
    }
  })
);
interface IAppBarProps {
  setTimer: (hours: number, minutes: number, timer: boolean) => void;
  openTimer: boolean;
  hrs: number;
  min: number;
}
const AppBarComponent: React.FC<IAppBarProps> = (props: IAppBarProps) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // const showTimerPaper = () => {
  //   setTimer(props.showTimer);
  // };

  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar>
        <Fab
          color="secondary"
          aria-label="add"
          className={classes.fabButton}
          onClick={handleOpen}
        >
          <AddIcon />
        </Fab>

        <div className={classes.grow} />
        {props.openTimer ? (
          <IconButton color="inherit" className={classes.timer}>
            <TimerPaper hrs={props.hrs} minutes={props.min} />
          </IconButton>
        ) : null}
        <IconButton color="inherit">
          <TimerIcon onClick={handleOpen2}></TimerIcon>
          <EnteriesModal
            open={open1}
            handleClose={handleClose1}
          ></EnteriesModal>
          <TimerModal open={open2} handleClose={handleClose2}></TimerModal>
        </IconButton>
        <IconButton color="inherit">
          <CheckCircleOutlineIcon
            onClick={handleOpen1}
          ></CheckCircleOutlineIcon>
        </IconButton>

        <IconButton color="inherit">
          <NotificationsNoneIcon></NotificationsNoneIcon>
        </IconButton>

        <IconButton color="inherit" edge="end">
          <HelpOutlineIcon></HelpOutlineIcon>
        </IconButton>
      </Toolbar>
      <RegisterTimeModal
        open={open}
        handleClose={handleClose}
        buttonClicked={props.setTimer}
      ></RegisterTimeModal>
    </AppBar>
  );
};
export default AppBarComponent;