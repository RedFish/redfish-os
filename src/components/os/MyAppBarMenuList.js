import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles
} from "@material-ui/core";
import { selectMenuItems } from "../../redux/task/task.selectors";
import { openTask } from "../../redux/task/task.reducer";
import { connect } from "react-redux";
import { COMPONENT_INFO } from "../apps/main";

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(2)
  }
}));
function MyAppBarMenu({
  closeMenu,
  //Redux states
  menuItems,
  //Redux actions
  openTask
}) {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <List dense>
        {(menuItems || []).map((item, index) => {
          if (item.component === "Divider") {
            return <Divider key={index} />;
          }

          const appInfo = COMPONENT_INFO[item.component];

          return (
            <ListItem
              key={index}
              onClick={() => {
                openTask({
                  component: item.component,
                  componentProps: item.componentProps
                });
                closeMenu();
              }}
            >
              <ListItemIcon>{appInfo.icon({})}</ListItemIcon>
              <ListItemText
                primary={appInfo.appname}
                secondary={item.componentProps.subtitle}
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

const mapStateToProps = (state) => ({
  menuItems: selectMenuItems(state)
});

const mapDispatchToProps = (dispatch) => ({
  openTask: (payload) => dispatch(openTask(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyAppBarMenu);
