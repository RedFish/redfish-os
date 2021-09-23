import { Divider, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    width: "100%",
    paddingTop: 9,
    paddingBottom: 9
  },
  title: {
    position: "absolute",
    top: 0,
    left: 15,
    backgroundColor: "white",
    padding: "0px 6px"
  }
}));

function TitleDivider({ title }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Divider />
      <Typography className={classes.title} variant="caption">
        {title}
      </Typography>
    </div>
  );
}

export default TitleDivider;
