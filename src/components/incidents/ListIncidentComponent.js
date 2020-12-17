import React, { Component } from 'react'
import IncidentService from "../../services/IncidentService";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';

class ListIncidentComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            incidents: [],
            message: null
        }
        this.deleteIncident = this.deleteIncident.bind(this);
        this.editIncident = this.editIncident.bind(this);
        this.addIncident = this.addIncident.bind(this);
        this.reloadIncidentList = this.reloadIncidentList.bind(this);
    }

    componentDidMount() {
        this.reloadIncidentList();
    }

    reloadIncidentList() {
        IncidentService.fetchIncidents()
            .then((res) => {
                this.setState({incidents: res.data})
            });
    }

    deleteIncident(id) {
        IncidentService.deleteIncident(id)
           .then(res => {
               this.setState({message : 'Incident deleted successfully.'});
               this.setState({incidents: this.state.incidents.filter(incidents => incidents.id !== id)});
           })
    }

    editIncident(id) {
        window.localStorage.setItem("id", id);
        this.props.history.push('/edit-incident');
    }

    addIncident() {
        window.localStorage.removeItem("id");
        this.props.history.push('/add-incident');
    }

    render() {
        return (
            <div>
                <Typography variant="h4" style={style}>Incident Details</Typography>
                <Button variant="contained" color="primary" onClick={() => this.addIncident()}>
                    Add Incident
                </Button>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell>service_name</TableCell>
                            <TableCell align="right">product_domain</TableCell>
                            <TableCell align="right">start_time</TableCell>
                            <TableCell align="right">mitigation_time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.incidents && this.state.incidents.map(row => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">{row.service_name}</TableCell>
                                <TableCell align="right">{row.product_domain}</TableCell>
                                <TableCell align="right">{row.start_time}</TableCell>
                                <TableCell align="right">{row.mitigation_time}</TableCell>
                                <TableCell align="right" onClick={() => this.editIncident(row.id)}><CreateIcon /></TableCell>
                                <TableCell align="right" onClick={() => this.deleteIncident(row.id)}><DeleteIcon /></TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
        );
    }

}

const style ={
    display: 'flex',
    justifyContent: 'center'
}

export default ListIncidentComponent;