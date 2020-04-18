import React, { Component } from "react";
import API from "../utils/API";
import "./GamePage.css";

class GamePage extends Component {

    // Probably need to store both playerOne and playerTwo data in state
    state = {
        username: "",
        cards: [],
        playerOneCards: [],
        playerTwoCards: [],
        timer: 60,
        round: "",
        playerOneClicked: "",
        playerTwoClicked: "",
        gameReady: false,
        gameId: ""
    }

    componentDidMount = () => {
        this.setState({
            username: this.props.username
        });
        console.log("THE USERNAME THAT YOU SET", this.props.username);

        API.findGame().then(res => {
            const gameObj = {playerOne: this.state.username,
                gameStatus: "waiting",              
            }
            if (res.data === null) {
                API.createGame(
                    gameObj
                ).then(res => {
                    console.log("CREATED GAME RESPONSE", res.data);
                    this.props.socket.emit("join game", "PASS IN GAME ID HERE");
                })
            }
            else {
                const updateGameObj = { playerTwo: this.state.username, gameStatus: "ready" }
                API.updateGame(updateGameObj).then(res => {
                    console.log("UPDATED GAME RESPONSE", res.data);
                    this.props.socket.emit("join game", "PASS IN GAME ID HERE");
                })
            }
        })



        API.getCards().then(res => {
            this.props.socket.emit("test");
            this.setState({ cards: res.data });
            this.drawCards();
            this.startTimer();
        }).catch(err => {
            console.log(err);
        });
    }

    startTimer = () => {
        var test = setInterval(this.countDown, 1000);
        // The function will need to be called with each round, so the time resets
        // After each player has chosen, the timer stops, and the battle logic commences.
        // Then, at the start of the next round, the timer is reset and starts back up.

        // Note, if a player does not pick a card within the allotted time, 
        // that player forefeits the match.
        return test;
    }
    
    countDown = (test) => {

        let time = this.state.timer - 1;

        if (time === -1) { 
          clearInterval(test);
        }
        else {
            this.setState({
                timer: time
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


    // on BTN click , call api endpoint /findGame
    /**
     * in .then .
     * - emit("join game", {gameId: , gameStatus: })
     * 
     * 
     * on("startGame")  
     * this.setSTate (...) and your UI template switches to game
    */


    
    


    // Probably will need to map/render over playerOne cards, as well as map/render..
    // .. playerTwo cards.

    // Right now, there's hardcoded style in CSS to shift up/down on active image. 
    // Basically a "held" click.
    // Need to handle JS to maintain the shift up/down of the image.

    // Should I add state, and have a "selectedCard" within state???
    render() {

        if (this.state.gameReady === false) {
            return (
                <>
                    <p>Return looking for game status, timer, and maybe a modal that will pop up
                        when a game has been found?
                    </p>
                </>
            )
        }


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