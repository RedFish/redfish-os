import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles
} from "@material-ui/core";
import { selectMenuItems } from "../../redux/task/task.selectors";
import { openTask } from "../../redux/task/task.reducer";
import { connect } from "react-redux";
import { getComponentInfo } from "../apps/main";
import TitleDivider from "../others/TitleDivider";
import { APP_BAR_HEIGHT } from "./MyAppBar";

const useStyles = makeStyles((theme) => ({
  list: {
    maxHeight: Math.min(600, window.innerHeight - APP_BAR_HEIGHT - 20),
    overflow: "scroll"
  },
  itemIcon: {
    minWidth: 40
  },
  secondaryTypography: {
    lineHeight: "12px",
    fontSize: "smaller"
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
    <List className={classes.list} dense>
      {(menuItems || []).map((item, index) => {
        if (item.component === "Divider") {
          return <TitleDivider key={index} title={item.componentProps.title} />;
        }

        const appInfo = getComponentInfo(item);

        return (
          <ListItem
            button
            key={index}
            onClick={() => {
              openTask({
                component: item.component,
                componentProps: item.componentProps
              });
              closeMenu();
            }}
          >
            <ListItemIcon className={classes.itemIcon}>
              {appInfo.icon({ size: "2x" })}
            </ListItemIcon>
            <ListItemText
              primary={appInfo.appname}
              primaryTypographyProps={{
                className: classes.primaryTypography
              }}
              secondary={item.componentProps.subtitle}
              secondaryTypographyProps={{
                className: classes.secondaryTypography
              }}
            />
          </ListItem>
        );
      })}
    </List>
  );
}

const mapStateToProps = (state) => ({
  menuItems: selectMenuItems(state)
});

const mapDispatchToProps = (dispatch) => ({
  openTask: (payload) => dispatch(openTask(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyAppBarMenu);
