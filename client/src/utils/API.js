import axios from "axios";

export default {

    registerNewUser: function() {
        axios.post("/api/user");
    },

    // user should have friends array, cards array, and deck array
    // so .get to those routes will not be necessary
    getUser: function() {
        axios.get("/api/user");
    },

    // .get to grab all cards from db
    // I think I'll need this... ?
    getCards: function() {
        axios.get("/api/cards");
    },

    playGame: function() {
        axios.post("/api/game");
    }
}