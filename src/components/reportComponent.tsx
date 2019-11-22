import React from "react";
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { IProjectTimeSheet } from "../model/timesheet";
import { IClientInfo } from "../model/clients";
import { IPhasesInfo } from "../model/phases";
import { IProjectInfo } from "../model/project";
import BarChart from "./bar";
import Chart from "./dougnutChart";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      minWidth: 300
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    },
    chart: {
      width: "80%",
      minHeight: 400,
      marginLeft: 10
    },
    pie: {
      marginRight: 5,
      marginTop: 5
    }
  })
);
interface ReportProps {
  project: IProjectInfo[];
  phases: IPhasesInfo[];
  clients: IClientInfo[];
  timeSheet: IProjectTimeSheet[];
  classes: any;
}
// interface chartDataState {
//   Budget: number;
//   TimeWorked:number;
// }
const ReportComponent: React.FC<ReportProps> = (props: ReportProps) => {
  const classes = useStyles();
  const [showChart, setChart] = React.useState(false);
  var [Budget, setBudget] = React.useState(0);
  var [timeWorked, settimeWorked] = React.useState(0);
  const [labels, setLabels] = React.useState<string[]>([]);
  const [dataset, setData] = React.useState<number[]>([]);
  const [project, setProject] = React.useState("");
  const [loadFirst, setLoadFirst] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  // var [timeWorked, setTimeWorked] = React.useState(0);
  const handleClose = () => {
    setOpen(false);
    setProject(props.project[0].name);
    showProjectCharts(props.project[0].name);
  };

  const handleChange = (e: any) => {
    setProject(e.target.value);
    showProjectCharts(e.target.value);
  };

  const showProjectCharts = (project: string) => {
    setChart(false);
    // console.log(e.target.value);
    Budget = 0;
    timeWorked = 0;
    let labels_n: string[] = [];
    let dataset_n: number[] = [];
    props.timeSheet.map((prop, key) => {
      if (prop.project.name === project) {
        Budget = prop.project.budget;
        timeWorked += prop.timeWorked;
        labels_n.push(prop.date);
        dataset_n.push(prop.timeWorked);
        setLabels(labels_n);
        setData(dataset_n);
        setBudget(Budget - timeWorked / 60);
        settimeWorked(timeWorked / 60);
      }
    });
    // console.log(Budget);
    // console.log(timeWorked);
    // console.log(labels);
    // console.log(dataset);
    if (timeWorked !== 0 && Budget !== 0) {
      setChart(true);
    } else {
      setOpen(true);
    }
  };

  React.useEffect(() => {
    if (
      props.project.length !== 0 &&
      props.timeSheet.length !== 0 &&
      !loadFirst
    ) {
      setProject(props.project[0].name);
      showProjectCharts(props.project[0].name);
      setLoadFirst(true);
    }
  }, [props]);

  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`
    };
  }

  const [modalStyle] = React.useState(getModalStyle);
  return (
    <div>
      <Grid container direction="row" justify="center">
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel htmlFor="project-native-simple">
            Select Project
          </InputLabel>
          <Select
            native
            value={project}
            onChange={e => {
              handleChange(e);
            }}
            inputProps={{
              name: "Projects",
              id: "project-native-simple"
            }}
          >
            {props.project.map((prop, key) => {
              return (
                <option value={prop.name} key={key}>
                  {prop.name}
                </option>
              );
            })}
          </Select>
        </FormControl>
      </Grid>

      <Grid container direction="row" spacing={2}>
        {showChart ? (
          <Grid item xs={6}>
            <div className={classes.pie}>
              <Chart
                labels={["Budget Left", "Consumed"]}
                chartData={[Budget, timeWorked]}
                color={["#D23456", "#f2f2f2"]}
                title={"Budget"}
              />
            </div>
          </Grid>
        ) : (
          <Modal open={open} onClose={e => handleClose()}>
            <div style={modalStyle} className={props.classes.paper1}>
              There is no Data in TimeSheet related to this Project
            </div>
          </Modal>
        )}
        {showChart ? (
          <Grid item xs={6}>
            <Grid container direction="row" justify="center">
              <div className={classes.chart}>
                <BarChart labels={labels} dataset={dataset}></BarChart>
              </div>
            </Grid>
          </Grid>
        ) : null}
      </Grid>
    </div>
  );
};
export default ReportComponent;
