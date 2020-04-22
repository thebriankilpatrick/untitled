import axios from "axios";

export default {

    registerNewUser: function(userObj) {
        console.log('axios post', userObj)
        return axios.post("/api/user", userObj);
    },

    getAllUsers: function() {
        return axios.get("/api/user");
    },

    userWin: function(userObj) {
        return axios.put("/api/user/win", userObj);
    },

    userLose: function(userObj) {
        return axios.put("/api/user/lose", userObj)
    },

    findUser: function(obj) {
        console.log("AXIOS FIND USER GET", obj);
        return axios.get("/api/findUser", obj);
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

    findGame: function(gameObj) {
        console.log("FIND GAME END POINT -----", gameObj);
        return axios.post("/api/findGame", gameObj);
    }

    // createGame: function(gameObj) {
    //     console.log("CREATE GAME OBJ", gameObj);
    //     return axios.post("/api/findGame", gameObj);
    // },

    // updateGame: function(gameObj) {
    //     return axios.put("/api/findGame", gameObj);
    // }
}