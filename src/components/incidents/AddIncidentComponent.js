import React, { Component } from 'react'
import IncidentService from "../../services/IncidentService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class AddIncidentComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            service_name: '',
            product_domain: '',
            start_time: '',
            mitigation_time: '',
            message: null
        }
        this.saveIncident = this.saveIncident.bind(this);
    }

    saveIncident = (e) => {
        e.preventDefault();
        let incident = {
            service_name: this.state.service_name, 
            product_domain: this.state.product_domain, 
            start_time: this.state.start_time, 
            mitigation_time: this.state.mitigation_time
        };
        IncidentService.addIncident(incident)
            .then(res => {
                this.setState({message : 'Incident added successfully.'});
                this.props.history.push('/incidents');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div>
                <Typography variant="h4" style={style}>Add Incident</Typography>
                <form style={formContainer}>

                    <TextField type="text" placeholder="service_name" fullWidth margin="normal" name="service_name" value={this.state.service_name} onChange={this.onChange}/>

                    <TextField type="text" placeholder="product_domain" fullWidth margin="normal" name="product_domain" value={this.state.product_domain} onChange={this.onChange}/>

                    <TextField type="text" placeholder="start_time" fullWidth margin="normal" name="start_time" value={this.state.start_time} onChange={this.onChange}/>

                    <TextField type="text" placeholder="mitigation_time" fullWidth margin="normal" name="mitigation_time" value={this.state.mitigation_time} onChange={this.onChange}/>

                    <Button variant="contained" color="primary" onClick={this.saveIncident}>Save</Button>
            </form>
    </div>
        );
    }
}
const formContainer = {
    display: 'flex',
    flexFlow: 'row wrap'
};

const style ={
    display: 'flex',
    justifyContent: 'center'

}

export default AddIncidentComponent;