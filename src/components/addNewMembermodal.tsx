import React from "react";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";

import { Grid, Modal, Typography, Button, TextField } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
<<<<<<< HEAD
import projectService from "../services/projectService";
interface INewMemberState {
  number: [{ Email: string; name: string; message: string }];
=======
interface INewMemberState {
  number: [{ Email: string; name: string }];
>>>>>>> 7e86e2ba8ad49a25c260b746f5c489368c86b9cd
}
interface INewMemberProps {
  open: boolean;
  handleClose: () => void;
  classes: any;
}

class InviteMember extends React.Component<INewMemberProps, INewMemberState> {
  constructor(props: INewMemberProps) {
    super(props);
    this.state = {
<<<<<<< HEAD
      number: [{ Email: "", name: "", message: "" }]
=======
      number: [{ Email: "", name: "" }]
>>>>>>> 7e86e2ba8ad49a25c260b746f5c489368c86b9cd
    };
  }

  getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`
    };
  }

  //   const [modalStyle] = React.useState(this.getModalStyle);

  addRow = () => {
    this.state.number.push({
      Email: "",
<<<<<<< HEAD
      name: "",
      message: ""
=======
      name: ""
>>>>>>> 7e86e2ba8ad49a25c260b746f5c489368c86b9cd
    });
    return this.setState({ number: this.state.number });
  };

<<<<<<< HEAD
  deleteRecord = (key: number) => {
    this.state.number.splice(key, 1);
    this.setState({ number: this.state.number });
  };
  loadEmailName = (e: any, key: number) => {
    this.state.number[key].message = "Would You join me ?";
    this.state.number[key].Email = e.target.value;
    this.setState({ number: this.state.number });
  };
  loadName = (e: any, key: number) => {
    this.state.number[key].name = e.target.value;
    this.setState({ number: this.state.number });
  };

  invite = (e: any) => {
    this.state.number.map((prop, key) => {
      projectService.inviteClients(prop).subscribe(() => console.log("done"));
    });
  };
=======
  deleteRecord = (e: any, key: number) => {};
  loadEmailName = (e: any, key: number) => {
    console.log(e.target.value);
  };
  loadName = (e: any, key: number) => {
    console.log(e.target.value);
  };

>>>>>>> 7e86e2ba8ad49a25c260b746f5c489368c86b9cd
  render() {
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.open}
        onClose={this.props.handleClose}
      >
        <div style={this.getModalStyle()} className={this.props.classes.paper1}>
          <Grid container direction="row" alignItems="center">
            <Grid item xs={2}>
              <PeopleOutlineIcon />
            </Grid>
            <Grid item xs={7}>
              <Typography variant="h6">Invite Members</Typography>
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={this.addRow}
              >
                Add new
              </Button>
            </Grid>
          </Grid>
          <hr></hr>
          <Grid container direction="row">
            <Grid item xs={5}>
              Email
            </Grid>
            <Grid item xs={5}>
              Name
            </Grid>
          </Grid>
          <br></br>

          {this.state.number.map((prop, key) => {
            console.log(prop);
            console.log(key);
            return (
              <div>
                <Grid container direction="row" alignItems="center">
                  <Grid item xs={5}>
                    <TextField
                      id="standard-uncontrolled"
                      value={prop.Email}
<<<<<<< HEAD
                      type="email"
=======
>>>>>>> 7e86e2ba8ad49a25c260b746f5c489368c86b9cd
                      onChange={e => this.loadEmailName(e, key)}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      id="standard-uncontrolled"
<<<<<<< HEAD
                      value={prop.name}
=======
                      value={prop.Email}
>>>>>>> 7e86e2ba8ad49a25c260b746f5c489368c86b9cd
                      onChange={e => this.loadName(e, key)}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <DeleteOutlineIcon
<<<<<<< HEAD
                      onClick={e => this.deleteRecord(key)}
=======
                      onClick={e => this.deleteRecord(e, key)}
>>>>>>> 7e86e2ba8ad49a25c260b746f5c489368c86b9cd
                    ></DeleteOutlineIcon>
                  </Grid>
                </Grid>
              </div>
            );
          })}
<<<<<<< HEAD
          <hr></hr>
          <Grid container direction="row" alignItems="center">
            <Grid item xs={10}></Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={e => this.invite(e)}
              >
                Send
              </Button>
            </Grid>
          </Grid>
=======
>>>>>>> 7e86e2ba8ad49a25c260b746f5c489368c86b9cd
        </div>
      </Modal>
    );
  }
}

export default InviteMember;