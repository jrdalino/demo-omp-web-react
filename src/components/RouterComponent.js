import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListIncidentComponent from "./incidents/ListIncidentComponent";
import AddIncidentComponent from "./incidents/AddIncidentComponent";
import EditIncidentComponent from "./incidents/EditIncidentComponent";
import React from "react";

const AppRouter = () => {
    return(
        <div style={style}>
            <Router>
                    <Switch>
                        <Route path="/" exact component={ListIncidentComponent} />
                        <Route path="/incidents" component={ListIncidentComponent} />
                        <Route path="/add-incident" component={AddIncidentComponent} />
                        <Route path="/edit-incident" component={EditIncidentComponent} />                    
                    </Switch>
            </Router>
        </div>
    )
}

const style={
    marginTop:'20px'
}

export default AppRouter;