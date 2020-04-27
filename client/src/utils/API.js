import axios from "axios";

export default {

    registerNewUser: function(userObj) {
        // console.log('axios post', userObj)
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
        // console.log("AXIOS FIND USER GET", obj);
        return axios.get("/api/findUser", obj);
    },

    getUser: function(userObj) {
        // console.log("Axios GET", userObj);
        // return axios.get("/api/user/" + userObj.email);
        return axios.post("/login", userObj);
    },

    getUpdatedUser: function(obj) {
        // console.log("LOOK FOR THIS ONE..............", obj);

        return axios.get("/api/updatedUser", obj);
    },

    getCards: function() {
        return axios.get("/api/cards");
    },

    findGame: function(gameObj) {
        // console.log("FIND GAME END POINT -----", gameObj);
        return axios.post("/api/findGame", gameObj);
    },

    leaveGame: function(gameId) {
        console.log("DELETE GAME ENDPOINT", gameId);
        return axios.delete("/api/leftGame/" + gameId);
    }
}