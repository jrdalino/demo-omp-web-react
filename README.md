# demo-omp-web-react# tsi-incidents-react

## Background
- Problem: Org Metrics Projects > DORA Metrics
```
- Lead Time for Changes: Baked in CI/CD Pipeline
- Deployment Frequency: Baked in CI/CD Pipeline
- Change Failure Rate: Baked in CI/CD Pipeline
- Time to Restore: Manually entered and computed in Postmortem Document
```

- Solution Part 1: Expose REST APIs so machines can automatically push events needed to generate MTTR Report. How do users use their Corp Identity to get the token? We cannot give users Cognito User Pool App Client Id and Secret Id.

- Solution Part 2: Create a Frontend so users manually push events needed to generate MTTR Report

- Major Challenges
```
- REST API Authorisation: this cannot be open to public
- Corporate Identity Federation using GSuite: We don't want to maintain our own Identity Provider
```

- Minor Additions
```
- I wanted to check out improvements to AWS Amplify. Ex. Importing an existing Cognito User Pool + Adopt Amplify Toolchain
- I wanted to build a reusable serverless CRUD template w/ GSuite Federation for internal portals
```

## User Flow Demo
- http://localhost:3000/ > Click on GSuite Login
- I will be redirected to Cognito SAML Federation Hosted UI > Click on GSuite
```
https://org-metrics.auth.ap-southeast-1.amazoncognito.com/login?redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&response_type=code&client_id=2bkilq2976q96hltsqd4tj0qmj&identity_provider=Google&scope=email%20openid%20org-metrics%2Fcreate&state=gvpN3JzLjNh1FO2Cp8OJoj9DZdJkByIL&code_challenge=RPKbsLqYNAj49plAxT6R7k-fJY3g9ePwyDbWaCvCwPs&code_challenge_method=S256&errorMessage=Login+option+is+not+available.+Please+try+another+one
```
- I will be redirected to accounts.google.com and asked to log in or choose an account
```
https://accounts.google.com/AccountChooser/signinchooser?continue=https%3A%2F%2Faccounts.google.com%2Fo%2Fsaml2%2Fidp%3Ffrom_login%3D1%26zt%3DChQxd01PR2d2ZUNNV2E3OTQ0MU9tNBIfRV9sc2lJNVVjb1FROEhuU1JuY2dubXFlUG84Q1pSYw%25E2%2588%2599AF-3PDcAAAAAX9RNpdkOlDWGdOxkvSNI_FYJwazOQ3kJ%26as%3DOKMMB6Ll8hmw2AhjrUTgoA&ltmpl=popup&btmpl=authsub&scc=1&oauth=1&flowName=GlifWebSignIn&flowEntry=AccountChooser
```
- I will be redirected to http://localhost:3000/ > Console > CognitoUser > SignInUserSession
- View Incident Details
- Show CURL without Access token will fail
```
curl -X GET \
https://vry1n6l7u4.execute-api.ap-southeast-1.amazonaws.com/prod/incidents \
-H 'Content-Type: application/json'
``` 
- Get Access token - http://localhost:3000/ > Console > CognitoUser > SignInUserSession
- Show CURL w/ Access token will work
```
curl -X GET \
https://vry1n6l7u4.execute-api.ap-southeast-1.amazonaws.com/prod/incidents \
-H 'Authorization: eyJraWQiOiIxWFpKUGIyaUF0VXBTYnhBXC9QQXpCRWgzRmxEYzdGN0ZZcTFhU2t4eDlmND0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJlZjBjNmE1Mi05M2U0LTQ4MTAtODhjNC1lNjlmZmU2MzJiNTkiLCJjb2duaXRvOmdyb3VwcyI6WyJhcC1zb3V0aGVhc3QtMV9tZzhwblI0VUNfR1N1aXRlIl0sInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoib3BlbmlkIG9yZy1tZXRyaWNzXC9jcmVhdGUgZW1haWwiLCJhdXRoX3RpbWUiOjE2MDc2NzIwOTgsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1zb3V0aGVhc3QtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aGVhc3QtMV9tZzhwblI0VUMiLCJleHAiOjE2MDc2NzU2OTgsImlhdCI6MTYwNzY3MjA5OCwidmVyc2lvbiI6MiwianRpIjoiMzEzYjFlYjQtZjVhYi00YTkxLWJiZjgtMjEzNTQ0OGE2ZjE4IiwiY2xpZW50X2lkIjoiMmJraWxxMjk3NnE5NmhsdHNxZDR0ajBxbWoiLCJ1c2VybmFtZSI6ImdzdWl0ZV9qb3NlLmRhbGluby5qckB3aWtvbmVjLmNvbSJ9.jKM32ayPkQ_OZgwxPKA2lPAek_c0wvPBMxXb6NpBCYWzLcokYaggQBZloK8H9xKewtui1LuorTttt2PKZXvsuGJfSbEwPya3pXMhb8JDM7wdZ8dY4dMjdTiStS5rdldJ8yiez1OsPo-gNYGvb67U-ZoVwfdRGac81ZFzXAqEdUBDLyaslG_zQRYJhLygR5CXd4H3ag53UY5-j69wOjZiiYz50wid5xkOhs9md1l8vIOQlZZv1MT6SQigKo7oiRvx4YKc2SMI8iD5riGBh7qSwPRPowGlc9t9hkK7_2g1TJtzdbOuyXrBHDPeg6IhvO-KNuqFc-fk6dxMzhvh6w0N2w' \
-H 'Content-Type: application/json'
```

- Add Incident and check that it appears in list
- Show that Edit and Delete Works as well

## Architecture Diagram
- Diagram
```
https://app.diagrams.net/#G1eBKRSz4Ei_HHWDhDy3x4uiAXSzc6MJzy
```
- To Speed up front end dev + I temporarily used Lambda + DynamodB

## Backend Project
- Show Visual Studio > aws-apigateway-cognito-auth > README.md
- Show Visual Studio > aws-serverless-crud > README.md

## Prerequsites - Backend API
- Backend API
```
Methods | Urls | Actions
-------   ----   -------
POST    | /incidents     | create a new Incident
GET     | /incidents     | retrieve all Incidents
GET	    | /incidents/:id | retrieve an Incident by :id
PUT	    | /incidents/:id | update an Incident by :id
DELETE	| /incidents/:id | delete an Incident by :id
```

- Create an Incident (POST)
```
$ curl -X POST \
https://vry1n6l7u4.execute-api.ap-southeast-1.amazonaws.com/prod/incidents \
-H 'Content-Type: application/json' \
-d '{ 
  "id": null, 
  "service_name": "acdpapi", 
  "product_domain": "acd", 
  "start_time": null, 
  "mitigation_time": null
}'
```
```
{"id": "5de4636b-3acf-11eb-93bb-8d564191774b", "service_name": "svc-a", "product_domain": "xyz", "start_time": "1607594786.8623128", "mitigation_time": "1607594786.8623128"}%   
```

- Return an Incident given the id (GET)
```
$ curl -X GET \
https://vry1n6l7u4.execute-api.ap-southeast-1.amazonaws.com/prod/incidents/0b0507aa-3aec-11eb-b17f-d380702da15b
```
```
{"service_name": "xpepapi", "product_domain": "xpe", "start_time": "1607584325.1234567", "mitigation_time": "1607584325.1234567", "id": "fda4c01d-3ad8-11eb-9029-c7881aac5ec0"}%   
```

- Update an Incident given the id (PUT)
```
$ curl -X PUT \
https://vry1n6l7u4.execute-api.ap-southeast-1.amazonaws.com/prod/incidents/5de4636b-3acf-11eb-93bb-8d564191774b \
-H 'Content-Type: application/json' \
-d '{"id": "5de4636b-3acf-11eb-93bb-8d564191774b", "service_name": "tsipap", "product_domain": "tsi", "start_time": "1607594786.7654321", "mitigation_time": "1607594786.7654321"}'
```
```
{"service_name": "tsipap", "product_domain": "tsi", "start_time": "1607594786.7654321", "id": "5de4636b-3acf-11eb-93bb-8d564191774b", "mitigation_time": "1607594786.7654321"}%  
```

- Delete Incident given the id (DELETE)
```
$ curl -X DELETE \
https://vry1n6l7u4.execute-api.ap-southeast-1.amazonaws.com/prod/incidents/0b0507aa-3aec-11eb-b17f-d380702da15b \
-H 'Content-Type: application/json'
```

- Return all Incidents (GET)
```
$ curl -X GET \
https://vry1n6l7u4.execute-api.ap-southeast-1.amazonaws.com/prod/incidents
```
```
[{"service_name": "svc-a", "product_domain": "xyz", "start_time": "1607584325.2155375", "mitigation_time": "1607584325.2155375", "id": "02532680-3ab7-11eb-8147-a1861faaacf1"}]% 
```

## Create React App
- Create React App & Test
```
$ npx create-react-app tsi-incidents-react
$ cd tsi-incidents-react
$ yarn start
```
- Directory Structure (TODO)

## Add Material UI Core and Icons, Router
- Install material ui and icons
```
$ yarn add @material-ui/core
$ yarn add @material-ui/icons
```

- Add React Router /src/components/RouterComponent.js
```
$ yarn add react-router-dom
```

- Add Navbar Component /src/components/Navbar.js

- Modify App Component /src/App.js

## Create React Service Components (Access to REST API)
- Install Axios (promise-based Javascript library used to make HTTP requests)
```
$ yarn add axios
```

- Create file /src/services/IncidentService.js

## Create React CRUD Components
- List Incidents Component /src/components/incidents/ListIncidentComponent.js

- Add Incidents Component /src/components/incidents/AddIncidentComponent.js

- Edit Incidents Component /src/components/incidents/EditIncidentComponent.js

## Add react-google-button for GSuite Login
```
$ yarn add react-google-button
```

## Add Authentication using Amplify
- Add Amplify and Amplify-React libraries to the ReactJS App
```
$ yarn add aws-amplify
```

- Add Amplify Configure to ./src/App.js
```
import Amplify, { Auth } from 'aws-amplify';

Amplify.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    // identityPoolId: "ap-southeast-1:63464c57-9b19-4926-a6f9-78650a5227d9",

    // REQUIRED - Amazon Cognito Region
    region: "ap-southeast-1",

    // OPTIONAL - Amazon Cognito Federated Identity Pool Region
    // Required only if it's different from Amazon Cognito Region
    identityPoolRegion: "ap-southeast-1",

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: "ap-southeast-1_mg8pnR4UC",

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "2bkilq2976q96hltsqd4tj0qmj",

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: true,

    // OPTIONAL - Hosted UI configuration
    oauth: {
      domain: "org-metrics.auth.ap-southeast-1.amazoncognito.com",
      scope: ["email", "openid", "org-metrics/create"],
      redirectSignIn: "http://localhost:3000/",
      redirectSignOut: "http://localhost:3000/",
      responseType: "code" // or 'token', note that REFRESH token will only be generated when the responseType is code
    }
  }
});
```

- Copy Code from Amplify Docs to ./src/App.js 
```
https://docs.amplify.aws/lib/auth/social/q/platform/js#full-samples
```

- Create file /src/components/auth/LoginComponent.js
```
import { Auth } from "aws-amplify";

onClick={() => Auth.federatedSignIn({ provider: "Google" })}
```

- GSuite Login URL
```
https://org-metrics.auth.ap-southeast-1.amazoncognito.com/login?client_id=2bkilq2976q96hltsqd4tj0qmj&response_type=token&redirect_uri=http://localhost:3000/
```

- Logout URL
```
https://org-metrics.auth.ap-southeast-1.amazoncognito.com/logout?client_id=2bkilq2976q96hltsqd4tj0qmj&response_type=token&redirect_uri=http://localhost:3000/
```

- Add JWT Token in /src/services/IncidentService.js
```
  fetchIncidents = async () => {
    let res = await Auth.currentSession();
    let accessToken = res.getAccessToken();
    let jwtToken = accessToken.getJwtToken();

    return axios.get(INCIDENT_API_BASE_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtToken
      }
    });
  };
```

## Add Authentication for Machines/CLI
- Get Access Token OAuth2
```
$ curl -X POST \
https://org-metrics.auth.ap-southeast-1.amazoncognito.com/oauth2/token \
-H 'Authorization: Basic N3YwN3JtOTVkcnZxOTQ4NDk5OW5zc2RzNGI6MTVyM2wwcDRzcXRrcnMxbXVydHY0dmVtZXNuNDVnZ2s4MDdiZHF2cnZwYzk2dnBmb3Y0Mg' \
-H 'Content-Type=application/x-www-form-urlencoded' \
-d 'grant_type=client_credentials&client_id=7v07rm95drvq9484999nssds4b'
```
- Example Response
```
{
    "access_token":"eyJraWQiOiIxWFpKUGIyaUF0VXBTYnhBXC9QQXpCRWgzRmxEYzdGN0ZZcTFhU2t4eDlmND0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI3djA3cm05NWRydnE5NDg0OTk5bnNzZHM0YiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoib3JnLW1ldHJpY3NcL2NyZWF0ZSIsImF1dGhfdGltZSI6MTYwNjkwNTY2OSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoZWFzdC0xX21nOHBuUjRVQyIsImV4cCI6MTYwNjkwOTI2OSwiaWF0IjoxNjA2OTA1NjY5LCJ2ZXJzaW9uIjoyLCJqdGkiOiJkMTY1MjRiZS0zZjIzLTRmMmEtYTUzZi04ZjQzNGYyNDQ4MDAiLCJjbGllbnRfaWQiOiI3djA3cm05NWRydnE5NDg0OTk5bnNzZHM0YiJ9.mkkoMSM8LTWdpFcyOS8CUOHoL4SiNDLHSBPw3465JEoL0n3Ol9oo9WaW2YZP12nZzHcEz1T72naArDI8nISgsVuOkDn7h0xHjoX4v9HkOkGZIcLMKQuRzJ36udG2_Q-BjBBt8IKKo4VUbkVAosyOvLr5Q1dj9KZyhVbn61KIdG68mM2LYjiwPxYDrTKlZ9dDGLGgxh2xaEAux4WAVKdVQTJh0X40BiC_IhrfxI3eY5KohbehW2yL2BjDWwWemCen8nyIyg9kWHwlPiRnsMa7rlDGjzr6n_iLMSCavMyvFLRMLKwrV1oj1UDwK-gL29_HaqkoPtodwD4MZxUXO0c-Ww",
    "expires_in":3600,
    "token_type":"Bearer"
}
```

- Login using Access Token
```
curl -X GET \
https://vry1n6l7u4.execute-api.ap-southeast-1.amazonaws.com/prod/incidents \
-H 'Content-Type: application/json'
```
- Login w.out Acess Token
```
curl -X GET \
https://vry1n6l7u4.execute-api.ap-southeast-1.amazonaws.com/prod/incidents \
-H 'Authorization: eyJraWQiOiIxWFpKUGIyaUF0VXBTYnhBXC9QQXpCRWgzRmxEYzdGN0ZZcTFhU2t4eDlmND0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJlZjBjNmE1Mi05M2U0LTQ4MTAtODhjNC1lNjlmZmU2MzJiNTkiLCJjb2duaXRvOmdyb3VwcyI6WyJhcC1zb3V0aGVhc3QtMV9tZzhwblI0VUNfR1N1aXRlIl0sInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoib3BlbmlkIGVtYWlsIiwiYXV0aF90aW1lIjoxNjA3NjU4NTg0LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGhlYXN0LTEuYW1hem9uYXdzLmNvbVwvYXAtc291dGhlYXN0LTFfbWc4cG5SNFVDIiwiZXhwIjoxNjA3NjYyMTg0LCJpYXQiOjE2MDc2NTg1ODQsInZlcnNpb24iOjIsImp0aSI6IjdmNDVhNTMyLThmOWMtNGJmZi1hZmNhLTRmNTk5ODU1YTI1NyIsImNsaWVudF9pZCI6IjJia2lscTI5NzZxOTZobHRzcWQ0dGowcW1qIiwidXNlcm5hbWUiOiJnc3VpdGVfam9zZS5kYWxpbm8uanJAd2lrb25lYy5jb20ifQ.A1fgDWA9fJQCrasPAMyf3_9XRmw-SFGSlnCvYpEEmyPj1ft639CKuUokrs8bbRDmbJ1bmdeVNcOOn96x-dHROTQmAnGlNuyyZmTVoCLuEXk4ALPyb5B1A5ojwuyzNcn31KejTuwq1mHMej2HhH9UogD5vsaDI8vN2DqKwmivuUS6tOfaWaGtookariCaYM2S4mX2dPJr4GenqHnHdp6mioa1YG4kxS7D99m1s083I_VD_Q-WNhmMjNvM2kDAuqd-m7OqD9QEwk1RVq2tRv-Lck0kpyC79l2pe9_SgbJmeRaE1VztzIuCSH9k-_mTbUnfRGfT6dMDIKnYAT46fx0LsA' \
-H 'Content-Type: application/json'
```

## Learnings
- Amplify: No point in adopting Amplify toolchain + UI
- What is JWT? JWT stands for JSON Web Token and is used for securely transmitting information between parties as a JSON object. JWT provides a stateless authentication mechanism as the user state is never saved in server memory. A JWT token consists of 3 parts separated with a dot(.) i.e. Header.payload.signature. 

## References
- https://github.com/jrdalino/aws-amplify-notes
- https://github.com/traveloka/terraform-aws-orgmetricspublisher
- https://aws.amazon.com/premiumsupport/knowledge-center/cognito-custom-scopes-api-gateway/
- https://docs.amplify.aws/lib/auth/social/q/platform/js#full-samples
- https://bezkoder.com/react-material-ui-examples-crud/
- https://github.com/only2dhir/react-js-material/tree/master/src
- https://www.devglan.com/react-js/spring-boot-reactjs-crud-example
- https://www.devglan.com/react-js/reactjs-material-ui-example
- https://www.devglan.com/react-js/react-js-jwt-authentication-example
- https://richardzcode.github.io/Journal-AWS-Amplify-Tutorial/step-02/