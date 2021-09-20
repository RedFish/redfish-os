import {
  AppBar,
  Grid,
  IconButton,
  makeStyles,
  Tab,
  Tabs,
  Toolbar
} from "@material-ui/core";
import { Menu, MoreVert, Phone } from "@material-ui/icons";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0
  },
  tabs: {
    width: "calc(100% - 60px)"
  }
}));

function MyAppBar(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar variant="dense">
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid item>
            <IconButton edge="start" color="inherit" aria-label="open drawer">
              <Menu />
            </IconButton>
          </Grid>
          <Grid item className={classes.tabs}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="on"
            >
              <Tab icon={<Phone />} label="Item One" />
              <Tab label="Item Two" />
              <Tab label="Item Three" />
            </Tabs>
          </Grid>
          <Grid item>
            <IconButton edge="end" color="inherit">
              <MoreVert />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default MyAppBar;
