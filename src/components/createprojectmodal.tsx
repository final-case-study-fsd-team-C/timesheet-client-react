import React from "react";
import Modal from "@material-ui/core/Modal";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { IProjectInfo } from "../model/project";
import { IPhasesInfo } from "../model/phases";
import { IClientInfo } from "../model/clients";
import { IProjectTimeSheet } from "../model/timesheet";
import FolderIcon from "@material-ui/icons/Folder";
import projectService from "../services/projectService";
import {
  FormControl,
  Select,
  InputLabel,
  Button,
  Grid,
  Typography,
  TextField,
  MenuItem,
  Checkbox,
  ListItemText,
  Input,
  Chip,
  Divider
} from "@material-ui/core";

import SketchExample from "./color";
import AddIcon from "@material-ui/icons/Add";
import AddMember from "./addmemberclasscomponent";
import MenuItemComponent from "./menuItem";
import classes from "*.module.sass";
import InviteMember from "./addNewMembermodal";

interface ICreateProjectModalProps {
  openCreateProjectModal: boolean;
  handleClose: () => void;
  project: IProjectInfo[];
  phases: IPhasesInfo[];
  clients: IClientInfo[];
  timeSheet: IProjectTimeSheet[];
  clientData: () => void;
  projectData: () => void;
  phaseData: () => void;
  timesheetData: () => void;
  classes: any;
}
interface IProjectState {
  open: boolean;
  open1: boolean;
  open2: boolean;
  open3: boolean;
  open4: boolean;
  openRate: boolean;
  openAddMemberModal: boolean;
  phase: string[];
  SelectedValue: any;
  SelectedValue1: any;
  addedProject: newProject;
  selectedPhase: string[];
}
interface newProject {
  name: string;
  projectColor: { r: string; g: string; b: string; a: string };
  clientId: number;
  members: { name: string; hourlyrate: number };
  phases: IPhasesInfo[];
  budget: number;
}

class CreateProjectModal extends React.Component<
  ICreateProjectModalProps,
  IProjectState
> {
  constructor(props: ICreateProjectModalProps) {
    super(props);
    this.state = {
      open: false,
      open1: false,
      open2: false,
      open3: false,
      open4: false,
      openRate: false,
      openAddMemberModal: false,
      phase: [],
      SelectedValue: "",
      SelectedValue1: "",
      addedProject: {
        name: "",
        projectColor: { r: "241", g: "112", b: "19", a: "1" },
        clientId: 1,
        members: { name: "", hourlyrate: 1 },
        phases: [],
        budget: 1
      },
      selectedPhase: []
    };
  }
  handleOpenInvitation = () => {
    console.log("Paras");
    this.setState({ openAddMemberModal: true });
  };

  getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`
    };
  }
  handleProjectName = (e: any) => {
    this.state.addedProject.name = e.target.value;
    this.setState({ addedProject: this.state.addedProject });
  };

  handleOpen4 = () => {
    this.setState({ open4: true, SelectedValue: "" });
  };

  handleClose = () => {
    this.setState({ open4: false });
  };
  handleMemberRate = (e: any) => {
    this.state.addedProject.members.hourlyrate = e.target.value;
    this.setState({ addedProject: this.state.addedProject });
  };

  handleBudget = (e: any) => {
    this.state.addedProject.budget = e.target.value;
    this.setState({ addedProject: this.state.addedProject });
  };
  handleClientName = (e: any) => {
    this.props.clients.map((prop, key) => {
      if (prop.name === e.target.value) {
        this.state.addedProject.clientId = prop.id;
        console.log(this.state.addedProject.clientId);
      }
    });
    this.setState({ addedProject: this.state.addedProject });
  };
  handleMemberName = (e: any) => {
    // this.state.SelectedValue1= e.target.value;
    // console.log("entered");
    this.state.addedProject.members.name = e.target.value;
    this.setState({ addedProject: this.state.addedProject });
  };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };
  handleClick1 = () => {
    this.setState({ open1: !this.state.open1 });
  };
  handleClick2 = () => {
    this.setState({ open2: !this.state.open2 });
  };
  handleClick3 = () => {
    this.setState({ open3: !this.state.open3 });
  };
  handleClick5 = () => {
    this.setState({ openRate: !this.state.openRate });
  };

  handlePhaseName = (e: string[]) => {
    console.log(e);
    this.setState({ selectedPhase: e }, () =>
      console.log(this.state.selectedPhase)
    );
  };
  handleColor = (e: any) => {
    this.state.addedProject.projectColor = e;
    this.setState({ addedProject: this.state.addedProject });
  };
  pushProject = () => {
    // console.log(this.state.selectedPhase);
    this.state.selectedPhase.map((prop1, key1) => {
      // console.log(prop1);
      this.props.phases.map((prop, key) => {
        if (prop1 === prop.name) {
          this.state.addedProject.phases.push({
            name: prop.name,
            id: prop.id,
            color: prop.color
          });
        }
      });
    });
    this.setState({ addedProject: this.state.addedProject });

    return projectService
      .postProject(this.state.addedProject)
      .subscribe(() => this.props.projectData());
  };

  componentDidUpdate() {
    if (
      this.state.SelectedValue === "" &&
      this.state.addedProject.members.name === "" &&
      this.props.project.length !== 0
    ) {
      this.setState({
        SelectedValue1: this.props.project[0].members.name,
        addedProject: {
          name: this.state.addedProject.name,
          projectColor: this.state.addedProject.projectColor,
          clientId: this.state.addedProject.clientId,
          members: {
            name: this.props.project[0].members.name,
            hourlyrate: this.state.addedProject.members.hourlyrate
          },
          phases: this.state.addedProject.phases,
          budget: this.state.addedProject.budget
        }
      });
    }
  }

  // handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  //   this.setState({ phase: event.target.value as string[] });
  //   // setPhase(event.target.value as string[]);
  // };
  render() {
    // console.log(this.props.project);
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.openCreateProjectModal}
        onClose={this.props.handleClose}
      >
        <div style={this.getModalStyle()} className={this.props.classes.paper1}>
          <Grid container direction="row" alignItems="center">
            <Grid item xs={1}>
              <FolderIcon />
            </Grid>
            <Grid item xs={11}>
              <Typography variant="h6" className={this.props.classes.title}>
                Create a new project
              </Typography>
            </Grid>
          </Grid>
          <Divider className={this.props.classes.divider} />

          <Grid
            container
            direction="row"
            alignItems="center"
            onClick={e => {
              this.handleClick();
            }}
          >
            <Grid item xs={10}>
              <Typography variant="h6">Project Details</Typography>
            </Grid>
            <Grid item xs={2}>
              <Grid container direction="row" justify="flex-end">
                {this.state.open ? <ExpandLess /> : <ExpandMore />}
              </Grid>
            </Grid>
          </Grid>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <Grid container direction="row" alignItems="flex-end">
              <Grid item xs={10}>
                <TextField
                  id="standard-full-width"
                  label="Name"
                  type="text"
                  placeholder="Placeholder"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={e => this.handleProjectName(e)}
                />
              </Grid>
              <Grid item xs={2}>
                <Grid container direction="row" justify="flex-end">
                  <SketchExample
                    displayColorPicker={false}
                    color={{ r: "241", g: "112", b: "19", a: "1" }}
                    handleColor={e => this.handleColor(e)}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid container direction="row">
              <Grid item xs={6}>
                <FormControl className={this.props.classes.formControl}>
                  <InputLabel htmlFor="age-native-simple">Client</InputLabel>
                  <Select
                    native
                    value={this.state.SelectedValue}
                    onChange={e => {
                      if (e.target.value === "create") {
                        this.handleOpen4();
                      } else if (e.target.value) {
                        this.setState({ SelectedValue: e.target.value });
                        this.handleClientName(e);
                      }
                    }}
                  >
                    {" "}
                    <optgroup label="">
                      {/* <option value="" /> */}
                      <option>No Selection</option>
                      <option value="create">Add Client</option>
                    </optgroup>
                    <optgroup label="">
                      {this.props.clients.map((prop, key) => {
                        // console.log(prop);
                        return (
                          <option key={key} value={prop.name}>
                            {prop.name}
                          </option>
                        );
                      })}
                    </optgroup>
                    <InviteMember
                      open={this.state.openAddMemberModal}
                      classes={this.props.classes}
                      handleClose={this.handleOpenInvitation}
                    ></InviteMember>
                    <AddMember
                      clientsData={this.props.clientData}
                      clientData={this.props.clients.map(client => ({
                        clients: client,
                        existence: true
                      }))}
                      open={this.state.open4}
                      handleClose={this.handleClose}
                      classes={this.props.classes}
                    ></AddMember>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Collapse>

          <Divider className={this.props.classes.divider} />
          <Grid
            container
            direction="row"
            alignItems="center"
            onClick={e => {
              this.handleClick1();
            }}
          >
            <Grid item xs={10}>
              <Typography variant="h6">Members</Typography>
            </Grid>
            <Grid item xs={2}>
              <Grid container direction="row" justify="flex-end">
                {this.state.open1 ? <ExpandLess /> : <ExpandMore />}
              </Grid>
            </Grid>
          </Grid>
          <Collapse in={this.state.open1} timeout="auto" unmountOnExit>
            <Grid
              container
              direction="row"
              alignItems="flex-end"
              style={{ marginTop: 18 }}
            >
              <Grid item xs={6}>
                <FormControl className={this.props.classes.formControl}>
                  <InputLabel htmlFor="age-native-simple">Members</InputLabel>
                  <Select
                    native
                    value={this.state.SelectedValue1}
                    onChange={e => {
                      this.handleMemberName(e);
                      this.setState({ SelectedValue1: e.target.value });
                    }}
                  >
                    {" "}
                    <optgroup label="">
                      {this.props.project.map((prop, key) => {
                        // console.log(prop);
                        return (
                          <option value={prop.members.name}>
                            {prop.members.name}
                          </option>
                        );
                      })}
                    </optgroup>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <Grid container direction="row" justify="flex-end">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className={this.props.classes.button1}
                    startIcon={<AddIcon />}
                    onClick={this.handleClick5}
                  >
                    hourly rate
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={2}></Grid>
            </Grid>
            <Collapse in={this.state.openRate} timeout="auto" unmountOnExit>
              <TextField
                type="number"
                onChange={e => this.handleMemberRate(e)}
              ></TextField>
            </Collapse>
          </Collapse>

          <Divider className={this.props.classes.divider} />

          <Grid
            container
            direction="row"
            alignItems="center"
            onClick={e => {
              this.handleClick2();
            }}
          >
            <Grid item xs={10}>
              <Typography variant="h6">Phases </Typography>
            </Grid>
            <Grid item xs={2}>
              <Grid container direction="row" justify="flex-end">
                {this.state.open2 ? <ExpandLess /> : <ExpandMore />}
              </Grid>
            </Grid>
          </Grid>
          <Collapse in={this.state.open2} timeout="auto" unmountOnExit>
            <Grid container direction="row">
              <Grid item xs>
                <MenuItemComponent
                  phases={this.props.phases}
                  classes={this.props.classes}
                  handleName={e => this.handlePhaseName(e)}
                />
              </Grid>
            </Grid>
          </Collapse>

          <Divider className={this.props.classes.divider} />

          <Grid
            container
            direction="row"
            alignItems="center"
            onClick={e => {
              this.handleClick3();
            }}
          >
            <Grid item xs={10}>
              <Typography variant="h6">Budget</Typography>
            </Grid>
            <Grid item xs={2}>
              <Grid container direction="row" justify="flex-end">
                {this.state.open3 ? <ExpandLess /> : <ExpandMore />}
              </Grid>
            </Grid>
          </Grid>
          <Collapse in={this.state.open3} timeout="auto" unmountOnExit>
            <Grid container direction="row">
              <Grid item xs={4}>
                <TextField
                  id="standard-full-width"
                  label="hrs"
                  style={{ margin: 6 }}
                  placeholder="Placeholder"
                  fullWidth
                  type="number"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={e => this.handleBudget(e)}
                />
              </Grid>
              <Grid item xs={2}></Grid>
            </Grid>
          </Collapse>
          <Divider className={this.props.classes.divider} />
          <Grid container direction="row" justify="flex-end">
            <Button
              variant="contained"
              className={this.props.classes.button1}
              onClick={e => this.pushProject()}
            >
              Create
            </Button>
          </Grid>
        </div>
      </Modal>
    );
  }
}

export default CreateProjectModal;
