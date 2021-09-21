import React, { useCallback, useMemo } from "react";
import Popper from "@material-ui/core/Popper";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, ClickAwayListener } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  popper: {
    zIndex: 2000,
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: "-0.9em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "0 1em 1em 1em",
        borderColor: `transparent transparent ${theme.palette.background.paper} transparent`
      }
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: "-0.9em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "1em 1em 0 1em",
        borderColor: `${theme.palette.background.paper} transparent transparent transparent`
      }
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: "-0.9em",
      height: "3em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 1em 1em 0",
        borderColor: `transparent ${theme.palette.background.paper} transparent transparent`
      }
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: "-0.9em",
      height: "3em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 0 1em 1em",
        borderColor: `transparent transparent transparent ${theme.palette.background.paper}`
      }
    }
  },
  arrow: {
    zIndex: 1,
    position: "absolute",
    fontSize: 7,
    width: "3em",
    height: "3em",
    "&::before": {
      content: '""',
      margin: "auto",
      display: "block",
      width: 0,
      height: 0,
      borderStyle: "solid"
    }
  }
}));

export default function TogglePopper({
  children,
  popper,
  disableClickAway,
  onOpen,
  disablePortal
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [arrowRef, setArrowRef] = React.useState(null);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleTogglePopper = useCallback(
    (event) => {
      setAnchorEl((anchorEl) => {
        if (anchorEl) {
          return null;
        } else {
          if (onOpen) onOpen();
          return event.currentTarget;
        }
      });
    },
    [setAnchorEl, onOpen]
  );

  const open = useMemo(() => Boolean(anchorEl), [anchorEl]);
  const _disablePortal = disablePortal === undefined ? true : disablePortal;

  return (
    <ClickAwayListener
      onClickAway={() => {
        if (!disableClickAway) setAnchorEl(null);
      }}
    >
      <div>
        {children(handleTogglePopper, open)}

        <Popper
          className={classes.popper}
          disablePortal={_disablePortal}
          open={open}
          anchorEl={anchorEl}
          placement="bottom"
          modifiers={{
            flip: {
              enabled: true
            },
            preventOverflow: {
              enabled: true,
              boundariesElement: "scrollParent"
            },
            arrow: {
              enabled: true,
              element: arrowRef
            }
          }}
        >
          <div>
            {_disablePortal && (
              <span className={classes.arrow} ref={setArrowRef} />
            )}
            <Paper elevation={6}>
              {typeof popper === "function" ? popper(handleClose) : popper}
            </Paper>
          </div>
        </Popper>
      </div>
    </ClickAwayListener>
  );
}
