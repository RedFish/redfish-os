import { IconButton, Tooltip } from "@material-ui/core";
import TogglePopper from "../others/TogglePopper";
import { Spin as Hamburger } from "hamburger-react";
import MyAppBarMenuList from "./MyAppBarMenuList";

function MyAppBarMenu() {
  return (
    <TogglePopper
      popper={(closeMenu) => <MyAppBarMenuList closeMenu={closeMenu} />}
    >
      {(onClick, open) => (
        <Tooltip
          title={open ? "Fermer" : "Menu"}
          disableFocusListener={true}
          disableTouchListener={true}
          placement="right"
        >
          <IconButton onClick={onClick}>
            <Hamburger size={20} toggled={open} rounded />
          </IconButton>
        </Tooltip>
      )}
    </TogglePopper>
  );
}

export default MyAppBarMenu;
