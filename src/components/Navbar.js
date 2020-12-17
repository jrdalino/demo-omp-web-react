import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import { Auth } from "aws-amplify";
import React from "react";

const style = {
  flexGrow: 1
};
const NavBar = ({ user }) => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={style}>
            Org Metrics: Incidents
          </Typography>
          <Button color="inherit" onClick={() => Auth.signOut()}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
