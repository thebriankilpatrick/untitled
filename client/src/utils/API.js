import axios from "axios";

export default {

    registerNewUser: function(userObj) {
        console.log('axios post', userObj)
        return axios.post("/api/user", userObj);
    },

    // user should have friends array, cards array, and deck array
    // so .get to those routes will not be necessary
    getUser: function() {
        return axios.get("/api/user");
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