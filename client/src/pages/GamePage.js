import React, { Component } from "react";
import BodyClassName from 'react-body-classname';
import API from "../utils/API";
import "./GamePage.css";

class GamePage extends Component {

    // Probably need to store both playerOne and playerTwo data in state
    state = {
        username: "",
        cards: [],
        playerOneCards: [],
        playerTwoCards: [],
        timerCount: 5,
        timer: null,
        timerName: null,
        round: "",
        playerOneClicked: "",
        playerTwoClicked: "",
        gameStatus: "waiting",
        gameId: "",

        // SOMETHING LIKE THIS??
        // game: {
        //     user: {
        //         exampleUser1: {
        //             health: 10,
        //             cards: [],
        //             pickedCard: ""
        //         },
        //         exampleUser2: {
        //             health: 10,
        //             cards: [],
        //             pickedCard: ""
        //         }
        //     }
        // }
    }

    // CREATE USER OBJECT, AND THEN STORE IN THE STATE!!

    componentDidMount = () => {
        this.setState({
            username: this.props.username
        });
        // console.log("THE USERNAME THAT YOU SET", this.props.username);

        const gameObj = {
            player: this.props.username
        }

        this.props.socket.on("startGame", (data) => {
            // data from socket only contains gameId and gameStatus
            // console.log("THIS IS THE DATA COMING BACK FROM SOCKET.IO -----------", data)
            this.setState({
                gameStatus: "found"
            });
            this.startTimer("preGameTimer");
        });

        console.log(this.state.gameStatus);

        API.findGame(gameObj).then(res => {
            console.log("RESPONSE FROM THE FIND GAME END POINT", res.data);

            // Create a player object, using the res.data received back from API?
            // Refer back to the users in state
            // Call function to draw four random cards, and set those in this object?
            // Examply
            // const playerObj = {
            //     username: res.data.playerOne, // How to differentiate between setting as player one or two??  if statement?
            //     cards: [], // Fill with data from card function
            //     health: 10,
            //     pickedCard: ""
            // }

            // Put in if statement,
            // if this.state.game.user is null, it means player one has not been added to state
            // if player one isn't null, it means you should set state for player two?
            if (this.state.game.user === null) {
                const playerObj = {
                    username: res.data.playerOne, // How to differentiate between setting as player one or two??  if statement?
                    cards: [], // Fill with data from card function
                    health: 10,
                    pickedCard: ""
                }
            }

            this.setState({
                gameId: res.data._id
            });
            // Only the playerTwo will emit the game data with both playerOne and playerTwo
            this.props.socket.emit("join game", {gameId: res.data._id, gameStatus: res.data.gameStatus});
           
        }).catch(err => {
            console.log(err);
        })
        

        // API.findGame().then(res => {
        //     const gameObj = {playerOne: this.state.username,
        //         gameStatus: "waiting",              
        //     }
        //     const updateGameObj = { playerTwo: this.state.username, gameStatus: "ready" }
        //     if (res.data === null) {
        //         API.createGame(
        //             gameObj
        //         ).then(res => {
        //             console.log("CREATED GAME RESPONSE", res.data);
        //             this.props.socket.emit("join game", "PASS IN GAME ID HERE");
        //         })
        //     }
        //     else {
        //         API.updateGame(updateGameObj).then(res => {
        //             console.log("UPDATED GAME RESPONSE", res.data);
        //             this.props.socket.emit("join game", "PASS IN GAME ID HERE");
        //         })
        //     }
        // })



        // API.getCards().then(res => {
        //     this.props.socket.emit("test");
        //     this.setState({ cards: res.data });
        //     this.drawCards();
        //     // this.startTimer();
        // }).catch(err => {
        //     console.log(err);
        // });
    }

    componentWillUnmount = () => {
        // Need to handle logic for if a user closes or refreshes the page..
    }

    // This is where the timer name in state is being set
    startTimer = (timerName) => {
        if (timerName === 'preGameTimer') {
            this.setState({
                timerCount: 5,
                timerName
            });
        }
        else if (timerName === "gameTimer") {
            this.setState({
                timerCount: 60,
                timerName
            });
        }
        this.setState({timer: setInterval(this.countDown, 1000)});
        // The function will need to be called with each round, so the time resets
        // After each player has chosen, the timer stops, and the battle logic commences.
        // Then, at the start of the next round, the timer is reset and starts back up.

        // Note, if a player does not pick a card within the allotted time, 
        // that player forefeits the match.
    }
    
    countDown = (test) => {
        console.log("TIMER NAME:", this.state.timerName);
        console.log("TIMER", test);
        let time = this.state.timerCount - 1;

        if (time === -1) { 
            clearInterval(this.state.timer);
            // REMEMBER TO ADD ALL OTHER LOGIC FOR DIFFERENT TIMER NAMES
            if (this.state.timerName === "preGameTimer") {
                this.setState({
                    gameStatus: "start"
                });
            }
            else if (this.state.timerName === "gameTimer") {
                // What to do here?
            }
        }
        else {
            this.setState({
                timerCount: time
            });
        }
      }


    // FUNCTION "DRAWS" FOUR RANDOM CARDS FOR PLAYER ONE AND PLAYER TWO
    // AND SETS THOSE EQUAL TO THE CORRESPONDING STATE

    // NOTE --------------------
    // HOW WILL THE LOGIC BE HANDLED FOR ACTUALLY DRAWING THE CARDS???
    // WILL THE FUNCTION BE RAN ONCE, AND BOTH USER'S WEB PAGES CALL IT?
    drawCards = () => {

        for (let i = 0; i < 2; i++) {
            const results = this.state.cards
            .sort(function() { return .5 - Math.random() }) // Shuffle array
            .slice(0, 4); // Get first 2 items

            const cardOne = results[0];
            const cardTwo = results[1];
            const cardThree = results[2];
            const cardFour = results[3];

            const playerCards = [];
            playerCards.push(cardOne, cardTwo, cardThree, cardFour);

            if (this.state.playerOneCards.length === 0) {
                this.setState({ playerOneCards: playerCards });
            }
            else {
                this.setState({ playerTwoCards: playerCards });
            }
        }
        console.log("PLAYER ONE-----", this.state.playerOneCards);
        console.log("PLAYER TWO-----", this.state.playerTwoCards);
    }

    playerOneClick = (event) => {
        this.setState({
            playerOneClicked: event.target.id
        });
    }

    playerTwoClick = (event) => {
        this.setState({
            playerTwoClicked: event.target.id
        })
    }
    


    // Probably will need to map/render over playerOne cards, as well as map/render..
    // .. playerTwo cards.

    render() {

        if (this.state.gameStatus === "waiting") {
            return (
                <>
                    <BodyClassName className="gamePagePic"></BodyClassName>
                    <div className="container centerText">
                        <div id="loadingIconDiv">
                            <img src="/assets/images/loadingCatGif.gif" alt="loading icon"></img>
                        </div>
                        <div className="centerText">
                            <h5 className="font" id="loadingText">Searching for game</h5>
                        </div>
                    </div>
                </>
            )
        }
        else if (this.state.gameStatus === "found") {
            return (
                <>
                    <BodyClassName className="gamePagePic"></BodyClassName>
                    <div className="container centerText">
                        <h5 className="font">Game has been found...</h5>
                        <h5 className="font">Game starts in {this.state.timerCount}</h5>
                    </div>
                </>
            )
        }

        else if (this.state.gameStatus === "start") {
            return (
                <>
                    <BodyClassName className="gamePagePic"></BodyClassName>
                    <div className="container">
                        <h5 className="font">Game started...Will need to be replaced with actual game</h5>
                    </div>
                </>
            )
        }

        else if (this.state.gameStatus === "end") {
            return (
                <>
                    <BodyClassName className="gamePagePic"></BodyClassName>
                    <div className="container">
                        <h5 className="font">Game Ended...
                        Put if statements inside of this return, to return results from the ended game.</h5>
                    </div>
                </>
            )
        }


        // This is original test render
        return (
            <>

                <div className="row" id="cardContainer">

                    {this.state.playerOneCards.map((card, index) => {
                        return (
                            <div className="col s3 m3 l3 xl3 cardSelectTop" key={index}>
                                <div className="card borderHover"
                                    onClick={this.playerOneClick}
                                    style={ this.state.playerOneClicked === card.title ? { top: "20px" } : {} }
                                >
                                    <div className="card-image">
                                        <img className="cardImg" src={card.img} 
                                            alt={card.title} 
                                            data-power={card.power} 
                                            id={card.title}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>

                <div className="row">
                    <div className="col s4 m4 l4">Player One</div>
                    <div className="col s4 m4 l4 center-align">
                        <p>Round: {this.state.round} Choose a card.</p>
                        <p>Time Remaining: {this.state.timer}</p>
                    </div>
                    <div className="col s4 m4 l4 right-align">Player Two</div>
                </div>

                <div className="row" id="cardContainer">

                    {this.state.playerTwoCards.map((card, index) => {
                        return (
                            <div className="col s3 m3 l3 xl3 cardSelectBot" key={index}>
                                <div className="card borderHover"
                                        onClick={this.playerTwoClick}
                                        style={ this.state.playerTwoClicked === card.title ? { top: "-20px" } : {} }
                                    >
                                    <div className="card-image" id={card.title}>
                                        <img className="cardImg" 
                                            src={card.img} 
                                            alt={card.title} 
                                            data-power={card.power}
                                            id={card.title}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </>
        )
    }

}

export default GamePage;