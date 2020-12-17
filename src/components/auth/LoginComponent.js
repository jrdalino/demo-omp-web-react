import { Box, Grid } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Auth } from "aws-amplify";
import React from "react";
import GoogleButton from "react-google-button";

const LoginScreen = () => {
  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Traveloka Org Metrics</Typography>
        </Toolbar>
      </AppBar>
      <Grid container direction="row" justify="center" alignItems="center">
        <Box pt={12} />
        <GoogleButton
          label="G-Suite Login"
          onClick={() => Auth.federatedSignIn({ provider: "Google" })}
        />
      </Grid>
    </React.Fragment>
  );
};

export default LoginScreen;
