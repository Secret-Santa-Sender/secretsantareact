import axios from "axios";

export default {
  createAdmin: function(admin) {
    return axios.post("/api/admin", admin);
  },
  createTeam: function(team) {
    return axios.post("/api/team", team);
  },
  createParticipant: function(participant) {
    return axios.post("/api/participant", participant);
  },
  createParticipant2: function(participant) {
    return axios.post("/auth/signup", participant);
  },
  updateParticipant: function(id) {
    return axios.put("/api/participant/"+ id);
  },
  addTeamToParticipant: function(id, team) {
    return axios.post("/api/participant/addTeamToParticipant/"+ id, team);
  },
  loginParticipant: function(participant) {
    return axios.post("/auth/login", participant);
  },
  checkForSession: function(participant) {
    return axios.get("/auth/checkforsession");
  },   
  findAdmin: function(id) {
    return axios.get("/api/admin/" + id);
  },
  findTeam: function(id) {
    return axios.get("/api/team/" + id);
  },
  getUser: function(id) {
    return axios.get("/api/participant/" + id);
  },
  findParticipantsAtCompany: function(id) {
    return axios.get("/api/participant/company/" + id);
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
