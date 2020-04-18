// const db = require("./models");

module.exports = function(socket) {
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
        console.log("Game joined ", data.gameId);
        socket.join(data.gameId);
        }
    })
    //when user leaves direct chat, leave socket chat room
    socket.on("leave game", function(data){
        if(data.gameId){
            console.log("Left game");
            socket.leave(data.gameId);
        }
    })

}