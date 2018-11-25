import axios from "axios";

export default {
  createAdmin: function(admin) {
    return axios.post("/api/admin", admin);
  },
  createParticipant: function(participant) {
    return axios.post("/api/participant", participant);
  },
  findAdmin: function(id) {
    return axios.get("/api/admin/" + id);
  },
  sendEmail: email => {
    return axios.post("/api/admin/sendemail", email);
  },
  makeMatches: function(id) {
    return axios.get("/api/participant/matches/" + id);
  },
  getCompaniesDueToday: function() {
    return axios.get("/api/admin/companiesdue/today");
  },
  confirmParticipant: function(id) {
    return axios.put("/api/participant/confirm/" + id);
  }
};
