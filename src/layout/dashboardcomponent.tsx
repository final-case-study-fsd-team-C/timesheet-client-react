import React from "react";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import PropTypes from "prop-types";
import VerticalTabs from "../components/tabscomponent";
import AppBarComponent from "../components/appbarcomponent";
import projectService from "../services/projectService";
import { IProjectInfo } from "../model/project";
import { IPhasesInfo } from "../model/phases";
import { IClientInfo } from "../model/clients";
import { IProjectTimeSheet } from "../model/timesheet";
import { Typography, Box } from "@material-ui/core";
import auth0Client from "../services/auth0";

interface IDashboard {
  backgroundColor: string;
  activeColor: string;

  hours: number;
  minutes: number;
  timesheet: { id: number; project: string; phase: string };
  setTimer: boolean;
  project: IProjectInfo[];
  phases: IPhasesInfo[];
  clients: IClientInfo[];
  timeSheet: IProjectTimeSheet[];
  openTimerEdit: boolean;
  timerId: number;
  projData: string;
  phase: string;
  note: string;
  hour: number;
  minute: number;
  date: string;
  timeWorked: number;
}

const TabPanel = (props: any) => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: "100%" }}
    >
      <Box>{children}</Box>
    </Typography>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

class Dashboard extends React.Component<{}, IDashboard> {
  intervalHandle: any;
  // totalTime: number;
  constructor(props: any) {
    super(props);
    // this.totalTime = 0;
    this.state = {
      backgroundColor: "black",
      activeColor: "info",
      hours:
        sessionStorage.getItem("hours") !== null
          ? Number.parseInt(sessionStorage.getItem("hours") + "")
          : 0,
      minutes:
        sessionStorage.getItem("minutes") !== null
          ? Number.parseInt(sessionStorage.getItem("minutes") + "")
          : 0,
      timesheet:
        sessionStorage.getItem("timesheet") !== null
          ? JSON.parse(sessionStorage.getItem("timesheet") + "")
          : { id: 0, project: "", phase: "" },
      setTimer:
        sessionStorage.getItem("timer") !== null
          ? Boolean(sessionStorage.getItem("timer"))
          : false,
      project: [],
      phases: [],
      clients: [],
      timeSheet: [],
      openTimerEdit: false,
      timerId: -1,
      projData: "",
      phase: "",
      note: "",
      hour: 0,
      minute: 0,
      date: "",
      timeWorked: 0
    };
  }
  totalTime = 0;
  getProjectData = () => {
    projectService.getProjectInfo().subscribe((projectInfo: IProjectInfo[]) => {
      this.setState({ project: projectInfo });
      console.log(projectInfo);
    });
  };
  getClientData = () => {
    projectService
      .getClientData()
      .subscribe((clientData: IClientInfo[]) =>
        this.setState({ clients: clientData })
      );
  };
  getPhaseData = () => {
    projectService
      .getPhasesInfo()
      .subscribe((phasesInfo: IPhasesInfo[]) =>
        this.setState({ phases: phasesInfo })
      );
  };
  getTimeSheetData = () => {
    projectService
      .getTimeSheetData()
      .subscribe((timeSheetInfo: IProjectTimeSheet[]) => {
        this.setState({ timeSheet: timeSheetInfo });
        this.totalTime = 0;
        timeSheetInfo.map((prop, key) => {
          this.totalTime += prop.timeWorked;
          this.setState({ timeWorked: this.totalTime / 60 });
        });
      });
  };
  componentDidMount() {
    this.getClientData();
    this.getPhaseData();
    this.getProjectData();
    this.getTimeSheetData();
  }

  tick = () => {
    if (this.state.minutes === 0) {
      this.setState({ hours: this.state.hours - 1, minutes: 60 }, () => {
        sessionStorage.setItem("hours", this.state.hours.toString());
        sessionStorage.setItem("minutes", this.state.minutes.toString());
      });
    }
    if (this.state.minutes === 0 && this.state.hours === 0) {
      clearInterval(this.intervalHandle);
    }
    this.setState({ minutes: this.state.minutes - 1 }, () => {
      console.log(this.state.hours, this.state.minutes);

      sessionStorage.setItem("hours", this.state.hours.toString());
      sessionStorage.setItem("minutes", this.state.minutes.toString());
    });
  };
  startCountDown = () => {
    this.intervalHandle = setInterval(this.tick, 60000);
  };

  setTimer = (
    hours: number,
    minutes: number,
    timesheet: { id: number; project: string; phase: string },
    timer: boolean
  ) => {
    if (this.state.setTimer) clearInterval(this.intervalHandle);
    this.setState({ hours, minutes, timesheet, setTimer: timer }, () => {
      this.startCountDown();
      sessionStorage.setItem("hours", hours.toString());
      sessionStorage.setItem("minutes", minutes.toString());
      sessionStorage.setItem("timesheet", JSON.stringify(timesheet));
      sessionStorage.setItem("timer", timer.toString());
    });
  };

  setTimerFromModal = (
    hours: number,
    minutes: number,
    timesheet: { id: number; project: string; phase: string },
    timer: boolean
  ) => {
    if (this.state.setTimer) clearInterval(this.intervalHandle);
    this.setState({ hours, minutes, timesheet, setTimer: timer }, () => {
      this.startCountDown();
      sessionStorage.setItem("hours", hours.toString());
      sessionStorage.setItem("minutes", minutes.toString());
      sessionStorage.setItem("timesheet", JSON.stringify(timesheet));
      sessionStorage.setItem("timer", timer.toString());
    });
  };

  closeTimer = () => {
    sessionStorage.removeItem("hours");
    sessionStorage.removeItem("minutes");
    sessionStorage.removeItem("timesheet");
    sessionStorage.removeItem("timer");
    this.setState({
      hours: 0,
      minutes: 0,
      timesheet: { id: 0, project: "", phase: "" },
      setTimer: false
    });
  };

  closeTimerEdit = () => {
    this.setState({ openTimerEdit: false });
  };

  openTimerEdit = () => {
    this.setState({
      openTimerEdit: true,
      timerId: -1,
      projData: "",
      phase: "",
      note: "",
      hour: 0,
      minute: 0,
      date: ""
    });
  };

  editTimer = (
    timerId: number,
    project: string,
    phase: string,
    note: string,
    hour: number,
    minute: number,
    date: string
  ) => {
    this.setState({
      openTimerEdit: true,
      timerId: timerId,
      projData: project,
      phase: phase,
      note: note,
      hour: hour,
      minute: minute,
      date: date
    });
    console.log(timerId, project, phase, note, hour, minute, date);
  };

  render() {
    return (
      <div>
        <Router>
          <VerticalTabs
            project={this.state.project}
            phases={this.state.phases}
            timeSheet={this.state.timeSheet}
            clients={this.state.clients}
            clientData={this.getClientData}
            projectData={this.getProjectData}
            phaseData={this.getPhaseData}
            timesheetData={this.getTimeSheetData}
            setTimer={this.setTimer}
            editTimer={this.editTimer}
            timeWorked={this.state.timeWorked}
          ></VerticalTabs>
          <Route
            path="/"
            exact
            render={() => {
              if (!auth0Client.isAuthenticated()) {
                auth0Client.signIn();
                return <div></div>;
              }
              return <Redirect to="/dash/dashboard" />;
            }}
          />
          <Route
            path="/dash/projects/details/:id"
            exact
            render={() => <Redirect to="/dash/projects" />}
          />
          <Route
            path="/dash/projects/edit/:id"
            exact
            render={() => <Redirect to="/dash/projects" />}
          />
        </Router>
        <AppBarComponent
          clientData={this.getClientData}
          projectData={this.getProjectData}
          phaseData={this.getPhaseData}
          timesheetData={this.getTimeSheetData}
          setTimer={this.setTimerFromModal}
          hrs={this.state.hours}
          min={this.state.minutes}
          timesheet={this.state.timesheet}
          openTimer={this.state.setTimer}
          project={this.state.project}
          phases={this.state.phases}
          timeSheet={this.state.timeSheet}
          clients={this.state.clients}
          timerId={this.state.timerId}
          projData={this.state.projData}
          phase={this.state.phase}
          note={this.state.note}
          hour={this.state.hour}
          minute={this.state.minute}
          date={this.state.date}
          editTimerOpen={this.state.openTimerEdit}
          openTimerEdit={this.openTimerEdit}
          closeEditTimer={this.closeTimerEdit}
          closeTimer={this.closeTimer}
        ></AppBarComponent>
      </div>
    );
  }
}

export default Dashboard;
