// const db = require("./models");
module.exports = function(server) {

    const io = require('socket.io').listen(server);
    io.on("connection", onConnect);//importing socket.io methods


    function onConnect(socket) {


        socket.on("join game", function(data){
            if(data.gameId){
                console.log("SOCKET FILE - Game joined ", data.gameId, data.gameStatus, data.user);
                socket.join(data.gameId);

                if (data.gameStatus === "ready") {

                    io.in(data.gameId).emit("startGame", data);
                }

                
            }
        });


        socket.on("opponent pick", function(data) {
            console.log("SOCKET FILE - Opponent Picked A Card", data.gameId, data);
            socket.to(data.gameId).emit("opponent pick", data);

        });

        //when user leaves direct chat, leave socket chat room
        socket.on("leave game", function(data){
            if(data.gameId){
                console.log("SOCKET FILE - Left game", data.gameId);
                socket.leave(data.gameId);
            }
        })
    }

}