import React, { Component } from "react";
import BodyClassName from 'react-body-classname';
import API from "../utils/API";
import "./GamePage.css";

class GamePage extends Component {

    // Probably need to store both playerOne and playerTwo data in state
    state = {
        username: "",
        cards: [],
        myCards: [],
        opponentCards: [],
        // playerOneCards: [],
        // playerTwoCards: [],
        timerCount: 5,
        timer: null,
        timerName: null,
        round: 1,
        playerOneClicked: "", // Left this in, in case we want to use logic for playerTwo (click function for cards on top row)
        userClicked: "",
        opponentClicked: "",
        userPower: "",
        gameStatus: "waiting",
        gameId: "",

        me: {
            pickedCard: {},
            health: 10
        },
        opponent: {
            username: "",
            pickedCard: {
                index: ""
            },
            health: 10
        }

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

            let opponent = this.state.opponent;

            if (data.user !== this.props.username) {
                opponent.username = data.user;
            }

            this.setState({
                gameStatus: "found",
                opponent
            });
            this.startTimer("preGameTimer");
        });

        // This grabs the index of the card the opponent clicked on...
        // Need to find a way to display to the other user's UI

        this.props.socket.on("opponent pick", (data) => {
            let opponent = this.state.opponent;
            // let opponentClicked = this.state.opponentCards[data.index].title;
            opponent.pickedCard = data.opponentCardIndex;

            console.log(data.opponentCardIndex);

            this.setState({
                opponent,
                opponentClicked: data.opponentCardIndex.index
            });

            if (this.state.userClicked !== "") {
                // If user has picked card already, by the time he/she got data back from opponent's card click,
                // then run function for comparing cards...
                this.compareCards();
            }
            // console.log(this.state.opponent.pickedCard.index);
            // console.log(this.state.opponentClicked);
            // console.log(this.state.opponentCards);
        });

        console.log(this.state.gameStatus);

        API.findGame(gameObj).then(res => {
            console.log("RESPONSE FROM THE FIND GAME END POINT", res.data);

            if (res.data.gameStatus === "ready") {
                let opponent = this.state.opponent;
                opponent.username = res.data.playerOne;

                this.setState({
                    opponent
                });
            }

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

            this.setState({
                gameId: res.data._id
            });
            // Only the playerTwo will emit the game data with both playerOne and playerTwo
            this.props.socket.emit("join game", {gameId: res.data._id, gameStatus: res.data.gameStatus, user: this.props.username});

           
        }).catch(err => {
            console.log(err);
        });
        

        API.getCards().then(res => {
            this.setState({ cards: res.data });
            this.drawCards();
        }).catch(err => {
            console.log(err);
        });
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
        // console.log("TIMER", test);
        // console.log("OPPONENT USERNAME-----------------------", this.state.opponent.username);
        let time = this.state.timerCount - 1;

        if (time === -1) { 
            clearInterval(this.state.timer);
            // REMEMBER TO ADD ALL OTHER LOGIC FOR DIFFERENT TIMER NAMES
            if (this.state.timerName === "preGameTimer") {
                this.setState({
                    gameStatus: "start"
                });
                this.startTimer("gameTimer");
            }
            else if (this.state.timerName === "gameTimer") {
                // What to do here?
                // Handle comparing of cards here...
                if (this.state.round < 4) {
                    let round = this.state.round;
                    round += 1;
                    this.setState({
                        round  
                    });
                    this.startTimer("gameTimer");
                }
                else {
                    // Handle end of game logic
                }
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

        const results = this.state.cards
        .sort(function() { return .5 - Math.random() }) // Shuffle array
        .slice(0, 4); // Get first 2 items

        const cardOne = results[0];
        const cardTwo = results[1];
        const cardThree = results[2];
        const cardFour = results[3];

        const playerCards = [];
        playerCards.push(cardOne, cardTwo, cardThree, cardFour);

        this.setState({ myCards: playerCards });

        // opponent cards...
        let opponentCards = this.state.opponentCards;

        for (let i = 0; i < 4; i++) {
            // opponentCards.push("/assets/images/opponentCardBack.jpg")
            let card = {
                title: i,
                img: "/assets/images/opponentCardBack.jpg"
            }
            opponentCards.push(card);
        }
        this.setState({
            opponentCards
        });
    }

    playerOneClick = (event) => {
        this.setState({
            playerOneClicked: event.target.id
        });
    }

    userClick = (event) => {
        // Stops the user from clicking a different card, after a card has been chosen
        // Remember to re set the state to ""
        if (this.state.userClicked !== "") {
            console.log("User Clicked DOES NOT EQUAL empty string", this.state.userClicked);
            return;
        }

        this.setState({
            userClicked: event.target.id
        });
        // console.log(event.target.id);
        let pickedCard = this.state.me;
        for (let i = 0; i < this.state.myCards.length; i++) {
            if (this.state.myCards[i].title === event.target.id) {
                // console.log("INDEX OF CARD PICKED--", i);
                // console.log("My Cards power in the state..", this.state.myCards[i].power);

                this.props.socket.emit("opponent pick", {gameId: this.state.gameId, opponentCardIndex: { 
                    index: i,
                    title: this.state.myCards[i].title,
                    power: this.state.myCards[i].power,
                    img: this.state.myCards[i].img
                }});

                pickedCard.pickedCard = this.state.myCards[i].title;
                this.setState({
                    pickedCard
                });

                this.setState({
                    userPower: this.state.myCards[i].power
                }, function() {
                    if (this.state.opponent.pickedCard.index !== "") {
                        // If you have received back from socket that the opponent has picked a card
                        // then run function to compare cards...
                        this.compareCards();
                    }
                });
            }
        }
        // if (this.state.opponent.pickedCard.index !== "") {
        //     // If you have received back from socket that the opponent has picked a card
        //     // then run function to compare cards...
        //     this.compareCards();
        // }
    }

    // Game function for comparing cards in between rounds..
    compareCards = () => {
        // let userPower;
        // console.log("Compare Cards function called! yay........");

        // console.log("The power of your clicked card is: ..........", this.state.userPower);
        if (this.state.userClicked === "") {
            return;
        }

        let myPower = this.state.userPower;
        let opponentPower = this.state.opponent.pickedCard.power;

        console.log("My power = ", myPower, "------Opponent Power", opponentPower);

        // You need to set the state of health to reflect these changes
        // Once you set the state, how do you want to display those changes to the users? 

        // Maybe... display round results in middle, with a next round countdown of 5 seconds
        // Then the next round begins..
        if (myPower > opponentPower) {
            let roundResult = myPower - opponentPower;
            console.log("You dealt ", roundResult, " damage to your opponent");
            let opponent = this.state.opponent;
            opponent.health -= roundResult;
            this.setState({
                opponent
            });
        }
        else if (myPower < opponentPower) {
            let roundResult = opponentPower - myPower;
            console.log("Your opponent dealt ", roundResult, " damage to you");
            let me = this.state.me;
            me.health -= roundResult;
            this.setState({
                me
            });
        }

        let opponent = this.state.opponent;
        opponent.pickedCard = {
            index: ""
        }
        this.setState({
            userClicked: "",
            opponentClicked: "",
            opponent
        });

        clearInterval(this.state.timer);
        if (this.state.round < 4) {
            let round = this.state.round;
            round += 1;
            this.setState({
                round  
            });
            this.startTimer("gameTimer");
        }
        else {
            // Handle end of game logic
        }
    }
    

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
                        <div id="loadingIconDiv">
                            <img src="/assets/images/loadingCatGif.gif" alt="loading icon"></img>
                        </div>
                        <div className="centerText">
                            <h5 className="font foundText" id="giveMeMargin">Opponent found! </h5>
                            <h5 className="font foundText">Game starts in {this.state.timerCount}</h5>
                        </div>
                    </div>
                </>
            )
        }

        else if (this.state.gameStatus === "start") {
            return (
                <>
                    <BodyClassName className="gamePagePic"></BodyClassName>
                    <div className="row" id="cardContainer">
                        {this.state.opponentCards.map((card, index) => {
                            return (
                                <div className="col s3 m3 l3 xl3" key={index}>
                                    <div className="opponentCards"
                                        // onClick={this.playerOneClick}
                                        style={ this.state.opponentClicked === card.title ? { top: "20px" } : {} }
                                        // style = { { top: "20px" } }
                                    >
                                        <div className="card-image">
                                            <img className="cardImg" src={card.img} 
                                                // alt={card.title} 
                                                // data-power={card.power} 
                                                // id={card.title}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className="row font">
                        <div className="col s4 m4 l4">
                            <p>{this.state.opponent.username}</p>
                            <p>health: {this.state.opponent.health}</p>
                        </div>
                        <div className="col s4 m4 l4 center-align">
                            <p>Round: {this.state.round} Choose a card.</p>
                            <p>Time Remaining: {this.state.timerCount}</p>
                        </div>
                        <div className="col s4 m4 l4 right-align">
                            <p>{this.props.username}</p>
                            <p>health: {this.state.me.health}</p>
                        </div>
                    </div>

                    <div className="row" id="cardContainer">
                        {this.state.myCards.map((card, index) => {
                            return (
                                <div className="col s3 m3 l3 xl3 cardSelectBot" key={index}>
                                    <div className="card borderHover"
                                            onClick={this.userClick}
                                            style={ this.state.userClicked === card.title ? { top: "-20px" } : {} }
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
        // return (
        //     <>

        //         <div className="row" id="cardContainer">

        //             {this.state.playerOneCards.map((card, index) => {
        //                 return (
        //                     <div className="col s3 m3 l3 xl3 cardSelectTop" key={index}>
        //                         <div className="card borderHover"
        //                             onClick={this.playerOneClick}
        //                             style={ this.state.playerOneClicked === card.title ? { top: "20px" } : {} }
        //                         >
        //                             <div className="card-image">
        //                                 <img className="cardImg" src={card.img} 
        //                                     alt={card.title} 
        //                                     data-power={card.power} 
        //                                     id={card.title}
        //                                 />
        //                             </div>
        //                         </div>
        //                     </div>
        //                 )
        //             })}

        //         </div>

        //         <div className="row">
        //             <div className="col s4 m4 l4">Player One</div>
        //             <div className="col s4 m4 l4 center-align">
        //                 <p>Round: {this.state.round} Choose a card.</p>
        //                 <p>Time Remaining: {this.state.timer}</p>
        //             </div>
        //             <div className="col s4 m4 l4 right-align">Player Two</div>
        //         </div>

        //         <div className="row" id="cardContainer">

        //             {this.state.playerTwoCards.map((card, index) => {
        //                 return (
        //                     <div className="col s3 m3 l3 xl3 cardSelectBot" key={index}>
        //                         <div className="card borderHover"
        //                                 onClick={this.playerTwoClick}
        //                                 style={ this.state.playerTwoClicked === card.title ? { top: "-20px" } : {} }
        //                             >
        //                             <div className="card-image" id={card.title}>
        //                                 <img className="cardImg" 
        //                                     src={card.img} 
        //                                     alt={card.title} 
        //                                     data-power={card.power}
        //                                     id={card.title}
        //                                 />
        //                             </div>
        //                         </div>
        //                     </div>
        //                 )
        //             })}

        //         </div>
        //     </>
        // )
    }

}

export default GamePage;