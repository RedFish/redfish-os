import React, { useContext, useEffect, useMemo } from "react";
import {
  Chip,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  makeStyles,
  Paper,
  Switch,
  Tooltip,
  Typography
} from "@material-ui/core";
import TaskContext from "../../contexts/TaskContext";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { openTask } from "../../redux/task/task.reducer";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  noPadding: { padding: 0 },
  header: {
    background: "white",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  sorting: { marginRight: theme.spacing(2) },
  list: {
    position: "absolute",
    padding: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "scroll"
  },
  itemText: {
    paddingRight: 60
  },
  playIconButton: {
    marginRight: 10
  },
  languageChip: {
    marginRight: 3
  },
  itemFooter: {
    marginTop: 3,
    marginBottom: 3
  }
}));
function GitHubProjects({
  //Redux actions
  openTask
}) {
  const classes = useStyles();
  const taskContext = useContext(TaskContext);
  const { componentProps, handleUpdateTaskComponent } = taskContext;
  const { repos, runnableOnly, sorting } = componentProps;

  useEffect(() => {
    fetch(new Request(componentProps.apiUrl))
      .then((response) => response.json())
      .then((repos) => {
        handleUpdateTaskComponent({ repos });
      })
      .catch((error) => {});
  }, [componentProps.apiUrl, handleUpdateTaskComponent]);

  const filteredRepos = useMemo(() => {
    let _repos = [...(repos || [])];
    if (runnableOnly) {
      _repos = _repos.filter((repo) => repo.has_pages);
    }

    switch (sorting) {
      case "name":
        _repos.sort((r1, r2) => {
          if (r1.name < r2.name) {
            return -1;
          }
          if (r1.name > r2.name) {
            return 1;
          }
          return 0;
        });
        break;
      case "date":
        _repos.sort((r1, r2) => {
          if (r1.pushed_at < r2.pushed_at) {
            return 1;
          }
          if (r1.pushed_at > r2.pushed_at) {
            return -1;
          }
          return 0;
        });
        break;
      default:
        break;
    }
    return _repos;
  }, [repos, runnableOnly, sorting]);
  return (
    <div className={classes.root}>
      <List className={classes.list} dense>
        <ListSubheader className={classes.noPadding}>
          <Paper className={classes.header}>
            <FormControlLabel
              className={classes.sorting}
              control={
                <ToggleButtonGroup
                  size="small"
                  exclusive
                  value={sorting || "name"}
                  onChange={(event, newSorting) => {
                    if (!newSorting) return;
                    handleUpdateTaskComponent({
                      sorting: newSorting
                    });
                  }}
                >
                  <ToggleButton value="name">Nom</ToggleButton>
                  <ToggleButton value="date">Date</ToggleButton>
                </ToggleButtonGroup>
              }
              label="Tri par"
              labelPlacement="start"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={runnableOnly || false}
                  onChange={(event) => {
                    handleUpdateTaskComponent({
                      runnableOnly: event.target.checked
                    });
                  }}
                />
              }
              label='Executable "RedfishOS" '
              labelPlacement="start"
            />
          </Paper>
        </ListSubheader>
        {filteredRepos.map((repo, index) => {
          return (
            <React.Fragment key={index}>
              <ListItem>
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start"
                >
                  <Grid item className={classes.itemText}>
                    <ListItemText
                      primary={repo.name}
                      secondary={repo.description}
                    />
                  </Grid>
                  <Grid item className={classes.itemFooter}>
                    {repo.language && (
                      <Chip
                        className={classes.languageChip}
                        label={repo.language}
                        size="small"
                      />
                    )}
                    <Typography variant="caption">
                      {new Date(repo.pushed_at).toLocaleDateString()}
                    </Typography>
                  </Grid>
                </Grid>
                <ListItemSecondaryAction>
                  {repo.has_pages && (
                    <Tooltip title="Lancer">
                      <IconButton
                        className={classes.playIconButton}
                        onClick={() => {
                          openTask({
                            component: "WebView",
                            componentProps: {
                              appname: repo.name,
                              url: `https://redfish.github.io/${repo.name}`
                            }
                          });
                        }}
                      >
                        <FontAwesomeIcon icon="play-circle" color="#266904" />
                      </IconButton>
                    </Tooltip>
                  )}
                  {repo.html_url && (
                    <Tooltip title="Voir sur GitHub">
                      <IconButton
                        onClick={() => {
                          window.open(repo.html_url);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={["fab", "github"]}
                          color="#212121"
                        />
                      </IconButton>
                    </Tooltip>
                  )}
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </React.Fragment>
          );
        })}
      </List>
    </div>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  openTask: (payload) => dispatch(openTask(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(GitHubProjects);
