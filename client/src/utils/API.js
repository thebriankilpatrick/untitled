import axios from "axios";

export default {

    registerNewUser: function(userObj) {
        console.log('axios post', userObj)
        return axios.post("/api/user", userObj);
    },

    // user should have friends array, cards array, and deck array
    // so .get to those routes will not be necessary
    getUser: function(userObj) {
        console.log("Axios GET", userObj);
        // return axios.get("/api/user/" + userObj.email);
        return axios.post("/login", userObj);
    },

    // .get to grab all cards from db
    // I think I'll need this... ?
    getCards: function() {
        return axios.get("/api/cards");
    },

    playGame: function() {
        return axios.post("/api/game");
    }
}