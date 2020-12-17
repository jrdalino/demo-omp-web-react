import React, { Component } from 'react'
import IncidentService from "../../services/IncidentService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class EditIncidentComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            id: '',
            service_name: '',
            product_domain: '',
            start_time: '',
            mitigation_time: '',
        }
        this.saveIncident = this.saveIncident.bind(this);
        this.loadIncident = this.loadIncident.bind(this);
    }

    componentDidMount() {
        this.loadIncident();
    }

    loadIncident() {
        IncidentService.fetchIncidentById(window.localStorage.getItem("id"))
            .then((res) => {
                let incident = res.data;
                this.setState({
                id: incident.id,
                service_name: incident.service_name,
                product_domain: incident.product_domain,
                start_time: incident.start_time,
                mitigation_time: incident.mitigation_time,
                })
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    saveIncident = (e) => {
        e.preventDefault();
        let incident = {
            id: this.state.id, 
            service_name: this.state.service_name, 
            product_domain: this.state.product_domain, 
            start_time: this.state.start_time, 
            mitigation_time: this.state.mitigation_time
        };
        IncidentService.editIncident(incident)
            .then(res => {
                this.setState({message : 'Incident added successfully.'});
                this.props.history.push('/incidents');
            });
    }

    render() {
        return (
            <div>
                <Typography variant="h4" style={style}>Edit Incident</Typography>
                <form>

                        <TextField type="text" placeholder="id" fullWidth margin="normal" name="id" readOnly={true} value={this.state.id}/>

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

const style ={
    display: 'flex',
    justifyContent: 'center'
}

export default EditIncidentComponent;