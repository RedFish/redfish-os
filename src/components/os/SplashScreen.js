import {
  Fade,
  Grid,
  LinearProgress,
  makeStyles,
  Typography
} from "@material-ui/core";
import Wallpaper from "../../assets/wallpaper.png";
import SplashLogo from "../../assets/splash-logo.png";
import React, { useEffect, useState } from "react";

function getLoadingSubtitle(progress) {
  if (progress < 20) {
    return "Initilisation de React";
  }
  // else if (progress < 30) {
  //   return "Mise en place du gestionnaire d'état Redux";
  // }
  else if (progress < 40) {
    return "Installation des applications";
  }
  // else if (progress < 50) {
  //   return "Initilisation du bureau";
  // }
  else if (progress < 60) {
    return "Téléchargement des compétences";
  }
  // else if (progress < 70) {
  //   return "Chargement des profils";
  // }
  else if (progress < 80) {
    return "Téléchargement des CVs";
  } else {
    return "";
  }
}

function getSpeed(progress) {
  if (progress < 30) return 8;
  else if (progress < 70) return 5;
  else return 8;
}

const useStyles = makeStyles((theme) => ({
  splash: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // opacity: 0.5,
    zIndex: 10000,
    backgroundImage: `url(${Wallpaper})`,
    backgroundPosition: "center center"
  },
  banner: {
    height: 200
  },
  panel: {
    width: Math.min(600, Math.min(350, window.innerWidth - 60)),
    height: Math.min(600, Math.min(250, window.innerHeight - 60)),
    borderRadius: 12,
    position: "absolute",
    background: `url(${SplashLogo}) no-repeat center center`,
    backgroundSize: "cover",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  grid: {
    height: "100%",
    marginTop: 50,
    color: "white"
  },
  progress: {
    height: 10,
    borderBottomLeftRadius: "inherit",
    borderBottomRightRadius: "inherit",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0
  }
}));

function SplashScreen({ children }) {
  const classes = useStyles();
  const [progress, setProgress] = useState(0);
  const [exited, setExited] = useState(false);

  useEffect(() => {
    let secTimer = setInterval(() => {
      setProgress((progress) => {
        const newProgress = Math.min(
          100,
          progress + Math.random() * getSpeed(progress)
        );
        console.log("progress", progress);
        if (newProgress >= 100) {
          clearInterval(secTimer);
        }
        return newProgress;
      });
    }, 200);

    return () => clearInterval(secTimer);
  }, []);

  return (
    <React.Fragment>
      {progress > 20 && children}

      {!exited && (
        <Fade
          in={progress < 100}
          timeout={{ exit: 1500 }}
          onExited={() => setExited(true)}
        >
          <div className={classes.splash}>
            <div className={classes.panel}>
              <Grid
                className={classes.grid}
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <Grid item>
                  <Typography variant="subtitle1">
                    {progress < 80 ? "Chargement" : "Démarrage"}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2">
                    {getLoadingSubtitle(progress)}
                  </Typography>
                </Grid>
              </Grid>
              <LinearProgress
                className={classes.progress}
                variant="determinate"
                value={progress}
                color="secondary"
              />
            </div>
          </div>
        </Fade>
      )}
    </React.Fragment>
  );
}

export default SplashScreen;
