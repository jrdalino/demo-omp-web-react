import Container from "@material-ui/core/Container";
import Amplify, { Auth, Hub } from "aws-amplify";
import React, { Fragment, useEffect, useState } from "react";
import Login from "../src/components/auth/LoginComponent";
import "./App.css";
import NavBar from "./components/Navbar";
import AppRouter from "./components/RouterComponent";

Amplify.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    // identityPoolId: "ap-southeast-1:63464c57-9b19-4926-a6f9-78650a5227d9",

    // REQUIRED - Amazon Cognito Region
    region: "ap-southeast-1",

    // OPTIONAL - Amazon Cognito Federated Identity Pool Region
    // Required only if it's different from Amazon Cognito Region
    // identityPoolRegion: "ap-southeast-1",

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: "ap-southeast-1_yy4gr7Env",

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "2k20b7ohsa46ucofjo9d9c10t7",

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: true,

    // OPTIONAL - Hosted UI configuration
    oauth: {
      domain: "org-metrics.auth.ap-southeast-1.amazoncognito.com",
      scope: [
        "email", 
        "openid", 
        "org-metrics/create_incident", 
        "org-metrics/read_incident", 
        "org-metrics/update_incident",
        "org-metrics/delete_incident",
        "org-metrics/list_incidents"
      ],
      redirectSignIn: "http://localhost:3000/",
      redirectSignOut: "http://localhost:3000/",
      responseType: "code" // or 'token', note that REFRESH token will only be generated when the responseType is code
    }
  }
});

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
        case "cognitoHostedUI":
          GetUser().then(userData => {
            console.log("userData: ", userData);
            setUser(userData);
          });
          break;
        case "signOut":
          setUser(null);
          break;
        case "signIn_failure":
        case "cognitoHostedUI_failure":
          console.log("Sign in failure", data);
          break;
      }
    });

    GetUser().then(userData => {
      setUser(userData);
    });
  }, []);

  const GetUser = () => {
    return Auth.currentAuthenticatedUser()
      .then(userData => userData)
      .catch(() => console.log("Not signed in"));
  };

  // console.log(user);
  // console.log(user.signInUserSession.accessToken.jwtToken);

  return (
    <div>
      {user ? (
        <Fragment>
          <NavBar />
          <Container>
            <AppRouter />
          </Container>
        </Fragment>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
