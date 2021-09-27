import Video1 from "../../assets/supermiro/video1.mp4";
import Video2 from "../../assets/supermiro/video2.mp4";
import Video3 from "../../assets/supermiro/video3.mp4";
import Background from "../../assets/supermiro/background.png";
import GooglePlayStore from "../../assets/supermiro/google-play-store.png";
import AppleStore from "../../assets/supermiro/apple-store.svg";
import { useState } from "react";
import { Button, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    overflow: "scroll"
  },
  phoneContainer: {
    background: `url(${Background}) center center no-repeat transparent`,
    backgroundSize: "100% auto",
    height: 600,
    position: "relative",
    width: 300,
    margin: "10px auto 20px",
    overflow: "hidden"
  },
  phoneElementVideo: {
    width: "106%",
    top: 19,
    right: -9,
    position: "absolute",
    zIndex: -1
  },
  store: {
    width: 160
  }
});

const Supermiro = (props) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const classes = useStyles();
  const sources = [Video1, Video2, Video3];
  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <Grid item>
          <div className={classes.phoneContainer}>
            <video
              className={classes.phoneElementVideo}
              autoPlay="autoplay"
              src={sources[currentVideoIndex]}
              onEnded={() => {
                setCurrentVideoIndex((i) => (i + 1) % 3);
              }}
              loop={true}
              type="video/mp4"
            >
              Your browser does not support HTML5 video.
            </video>
          </div>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Button>
                <img
                  className={classes.store}
                  src={GooglePlayStore}
                  alt="Google Play Store"
                  onClick={() => {
                    window.open(
                      "https://play.google.com/store/apps/details?id=com.supermiro.supermiro"
                    );
                  }}
                />
              </Button>
            </Grid>
            <Grid item>
              <Button>
                <img
                  className={classes.store}
                  src={AppleStore}
                  alt="Apple Store"
                  onClick={() => {
                    window.open(
                      "https://apps.apple.com/fr/app/supermiro/id1247392580"
                    );
                  }}
                />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Supermiro;
