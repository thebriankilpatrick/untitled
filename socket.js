// const db = require("./models");
module.exports = function(server) {

    const io = require('socket.io').listen(server);
    io.on("connection", onConnect);//importing socket.io methods


    function onConnect(socket) {
        // Need to handle SO MUCH functionality here....

        socket.on("test", function() {
            console.log("I REALLY HOPE THIS WORKS");
        })

        /**
         * JOIN GAME
         * socket.join(data.gameId)
         * check gameStatus
         * if (gamesStatus === "ready") {
         *  socket.broadcast.to(data.gameId).emit("startGame", object);
         * }
        */


        socket.on("join game", function(data){
            if(data.gameId){
                console.log("SOCKET FILE - Game joined ", data.gameId, data.gameStatus);
                socket.join(data.gameId);

                if (data.gameStatus === "ready") {

                    io.in(data.gameId).emit("startGame", data);
                }
            }
        })
        //when user leaves direct chat, leave socket chat room
        socket.on("leave game", function(data){
            if(data.gameId){
                console.log("SOCKET FILE - Left game", data.gameId, data.gameStatus);
                socket.leave(data.gameId);
            }
        })
    }

}