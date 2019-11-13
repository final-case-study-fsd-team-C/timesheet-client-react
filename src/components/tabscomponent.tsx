import React from "react";
import { RouteComponentProps } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import routes from "../routes/dashboardrouters";
import history from "../services/history";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import managementRoutes from "../routes/managementRoutes";
import { Typography, Box } from "@material-ui/core";
import StatusComponent from "./statuscomponent";
import ActivityLogComponent from "./activitylogcomponent";
import WorkspaceSettingComponent from "./workspacesettingcomponent";

const ITEM_HEIGHT = 48;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 65,
    backgroundColor: theme.palette.background.paper,
    display: "flex"
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  menu: {
    marginLeft: "100"
  }
}));
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

const VerticalTabs: React.FC<RouteComponentProps> = (
  props: RouteComponentProps
) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [managementValue, setManagementValue] = React.useState();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    if (newValue !== 5) {
      setValue(newValue);
    }
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  console.log(open);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {routes.map((prop, key) => {
          return (
            <Tab
              key={key}
              label={prop.name}
              onClick={event => {
                event.preventDefault();
                history.push(prop.layout + prop.path);
                // history.push(prop.layout + prop.path);
              }}
            ></Tab>
          );
        })}
        <Tab
          label="Management"
          onClick={event => {
            event.preventDefault();
            setManagementValue(null);
            handleClick(event);
          }}
        >
          {" "}
        </Tab>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200
            }
          }}
          //   selected={option === 'Pyxis'}
        >
          {managementRoutes.map((prop, key) => (
            <MenuItem
              key={prop.name}
              onClick={e => {
                handleClose();
                history.push(prop.layout + prop.path);
                setManagementValue(key);
                setValue(5);
              }}
            >
              {prop.name}
            </MenuItem>
          ))}
        </Menu>
      </Tabs>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        <StatusComponent />
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        <ActivityLogComponent />
      </TabPanel>
      <TabPanel value={value} index={5}>
        {managementValue === 3 ? <WorkspaceSettingComponent /> : null}
      </TabPanel>
    </div>
  );
};

export default VerticalTabs;