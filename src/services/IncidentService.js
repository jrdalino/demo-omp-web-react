import axios from "axios";
import { Auth } from "aws-amplify";

const INCIDENT_API_BASE_URL =
  "https://0tgyf7bp72.execute-api.ap-southeast-1.amazonaws.com/prod/incidents";

class IncidentService {
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

  fetchIncidentById(id) {
    return axios.get(INCIDENT_API_BASE_URL + "/" + id);
  }

  deleteIncident(id) {
    return axios.delete(INCIDENT_API_BASE_URL + "/" + id);
  }

  addIncident(incident) {
    return axios.post("" + INCIDENT_API_BASE_URL, incident);
  }

  editIncident(incident) {
    return axios.put(INCIDENT_API_BASE_URL + "/" + incident.id, incident);
  }
}

export default new IncidentService();
