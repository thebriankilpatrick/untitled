import React, { Component } from "react";
import BodyClassName from 'react-body-classname';
import { Link } from "react-router-dom";
import API from "../utils/API";
import "./GamePage.css";

class GamePage extends Component {

    state = {
        username: "",
        cards: [],
        myCards: [],
        opponentCards: [],
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
        roundResult: null,
        roundResultText: "",
        gameTextOne: "",
        gameTextTwo: "",
        endTextOne: "",
        endTextTwo: "",
        receivedDmg: false,
        dealtDmg: false,
        lastRound: false,
        userForfeit: false,
        opponentForfeit: false,

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
    }

    componentDidMount = () => {
        // console.log("MY ID IS............", this.props.userId);
        this.setState({
            username: this.props.username
        });
        // console.log("THE USERNAME THAT YOU SET", this.props.username);

        const gameObj = {
            player: this.props.username
        }

        this.props.socket.on("startGame", (data) => {
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

        this.props.socket.on("opponent pick", (data) => {
            let opponent = this.state.opponent;
            // let opponentClicked = this.state.opponentCards[data.index].title;
            opponent.pickedCard = data.opponentCardIndex;

            // console.log(data.opponentCardIndex);

            this.setState({
                opponent,
                opponentClicked: data.opponentCardIndex.index
            });

            if (this.state.userClicked !== "") {
                // If user has picked card already, by the time he/she got data back from opponent's card click,
                this.compareCards();
            }

        });

        console.log(this.state.gameStatus);

        API.findGame(gameObj).then(res => {
            // console.log("RESPONSE FROM THE FIND GAME END POINT", res.data);

            if (res.data.gameStatus === "ready") {
                let opponent = this.state.opponent;
                opponent.username = res.data.playerOne;

                this.setState({
                    opponent
                });
            }

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

        this.props.socket.emit("leave game", {gameId: this.state.gameId});

        let me = this.state.me;
        me.health = 0;
        this.setState({
            me
        });
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
        else if (timerName === "betweenRoundTimer") {
            // console.log("WHAT ROUND IS THIS?????", this.state.round);
            this.setState({
                timerCount: 5,
                timerName
            });
        }
        else if (timerName === "endTimer") {
            this.setState({
                timerCount: 5,
                timerName
            });
        }
        this.setState({timer: setInterval(this.countDown, 1000)});

    }
    
    countDown = (test) => {

        let time = this.state.timerCount - 1;

        if (time === -1) { 
            clearInterval(this.state.timer);

            if (this.state.timerName === "preGameTimer") {
                this.setState({
                    gameStatus: "start"
                });
                this.startTimer("gameTimer");
                this.storeGameText();
            }
            else if (this.state.timerName === "betweenRoundTimer") {

                if (this.state.me.health === 0) {
                    this.setState({
                        roundResultText: "You Lost!  Better Luck Next Time!",
                        dealtDmg: false,
                        receivedDmg: true  
                    }, function() {
                        this.storeBetweenText();
                    });
                    this.startTimer("endTimer");
                }
                else if (this.state.opponent.health === 0) {
                    this.setState({
                        roundResultText: "You Won!  Clearly, Your Opponent Just Wasn't That Good.",
                        dealtDmg: true,
                        receivedDmg: false 
                    }, function() {
                        console.log("Received damage?", this.state.receivedDmg);
                        console.log("Or dealt damage??", this.state.dealtDmg);
                        this.storeBetweenText();
                    });
                    this.startTimer("endTimer");
                }
                else {
                    this.setState({
                        dealtDmg: false,
                        receivedDmg: false 
                    })
                    this.displayCards();
                    this.startTimer("gameTimer");
                    this.storeGameText();
                }
            }
            else if (this.state.timerName === "gameTimer") {

                if (this.state.userClicked === "" || this.state.opponentClicked === "") {
                    this.playerForfeit();
                }

                if (this.state.round < 4) {
                    let round = this.state.round;
                    round += 1;
                    this.setState({
                        round  
                    });
                    this.startTimer("betweenRoundTimer");
                    this.storeBetweenText();
                }
                else {

                    this.startTimer("endTimer");
                    this.storeBetweenText();
                }
            }
            else if (this.state.timerName === "endTimer") {
                this.setState({
                    gameStatus: "end"
                }, function() {
                    this.endOfGameText();
                });
            }
        }
        else {
            this.setState({
                timerCount: time
            });
        }
      }

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

    displayCards = () => {
        let myCards = this.state.myCards;
        let index;
        for (let i = 0; i < myCards.length; i++) {
            if (this.state.userClicked === myCards[i].title) {
                index = i;
                // console.log("Here is the index of your splice----", i);
            }
        }
        // myCards.splice(index, 1);

        myCards[index]["used"] = true;

        this.setState({
            myCards
        });

        let opponentCards = this.state.opponentCards;
        let opponentIndex = this.state.opponent.pickedCard.index
        // opponentCards.splice(opponentIndex, 1);
        opponentCards[opponentIndex]["used"] = true;
        this.setState({
            opponentCards
        });

        let opponent = this.state.opponent;
        opponent.pickedCard = {
            index: ""
        }
        this.setState({
            userClicked: "",
            opponentClicked: "",
            opponent
        });

    }

    playerOneClick = (event) => {
        this.setState({
            playerOneClicked: event.target.id
        });
    }

    userClick = (event) => {
        // Stops the user from clicking a different card, after a card has been chosen
        if (this.state.userClicked !== "") {
            // console.log("User Clicked DOES NOT EQUAL empty string", this.state.userClicked);
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
    }

    // Game function for comparing cards in between rounds..
    compareCards = () => {

        // console.log("The power of your clicked card is: ..........", this.state.userPower);
        if (this.state.userClicked === "") {
            return;
        }

        let myPower = this.state.userPower;
        let opponentPower = this.state.opponent.pickedCard.power;

        let opponentInd = this.state.opponent.pickedCard.index;

        let opponentCards = this.state.opponentCards;
        opponentCards[opponentInd]["revealed"] = true;

        if (myPower > opponentPower) {
            let roundResult = myPower - opponentPower;
            // console.log("You dealt ", roundResult, " damage to your opponent");
            let opponent = this.state.opponent;
            opponent.health -= roundResult;
            if (opponent.health < 0) {
                opponent.health = 0;
            }
            this.setState({
                opponent,
                roundResultText: "You dealt " + roundResult + " damage to your opponent!",
                dealtDmg: true,
                receivedDmg: false
            });
        }
        else if (myPower < opponentPower) {
            let roundResult = opponentPower - myPower;
            // console.log("Your opponent dealt ", roundResult, " damage to you");
            let me = this.state.me;
            me.health -= roundResult;
            if (me.health < 0) {
                me.health = 0;
            }

            this.setState({
                me,
                roundResultText: "Your opponent dealt " + roundResult + " damage to you.",
                receivedDmg: true,
                dealtDmg: false
            });
        }
        else if (myPower === opponentPower) {
            this.setState({
                roundResultText: "The power of the cards were equal, no damage was dealt this round."
            });
        }

        // let myCards = this.state.myCards;
        // let index;
        // for (let i = 0; i < myCards.length; i++) {
        //     if (this.state.userClicked === myCards[i].title) {
        //         index = i;
        //         // console.log("Here is the index of your splice----", i);
        //     }
        // }
        // myCards.splice(index, 1);
        // this.setState({
        //     myCards
        // });

        // let opponentCards = this.state.opponentCards;
        // let opponentIndex = this.state.opponent.pickedCard.index
        // opponentCards.splice(opponentIndex, 1);
        // this.setState({
        //     opponentCards
        // });

        // let opponent = this.state.opponent;
        // opponent.pickedCard = {
        //     index: ""
        // }
        // this.setState({
        //     userClicked: "",
        //     opponentClicked: "",
        //     opponent
        // });

        clearInterval(this.state.timer);
        if (this.state.round < 4) {
            let round = this.state.round;
            round += 1;
            this.setState({
                round  
            }, function() {
                this.storeBetweenText();
            });
            this.startTimer("betweenRoundTimer");
        }
        else {
            if (this.state.round === 4) {
                this.setState({
                    lastRound: true
                });
                if (this.state.userForfeit) {
                    this.setState({
                        roundResultText: "You didn't pick a card!  Wake up next time!",
                        receivedDmg: true,
                        dealtDmg: false
                    });
                }
                else if (this.state.opponentForfeit) {
                    this.setState({
                        roundResultText: "Your opponent fell asleep, and didn't pick a card!",
                        dealtDmg: true,
                        receivedDmg: false
                    });
                }
                else if (this.state.me.health < this.state.opponent.health) {
                    // console.log("I lost!");
                    this.setState({
                        roundResultText: "You Lost!  Better Luck Next Time!",
                        receivedDmg: true,
                        dealtDmg: false
                    }, function() {
                        this.storeBetweenText();
                    });
                    this.startTimer("endTimer");
                }
                else if (this.state.me.health > this.state.opponent.health) {
                    // console.log("I won!");
                    this.setState({
                        roundResultText: "You Won!  Clearly, Your Opponent Just Wasn't That Good.",
                        dealtDmg: true,
                        receivedDmg: false
                    }, function() {
                        this.storeBetweenText();
                    });
                    this.startTimer("endTimer");
                }
            }
        }
    }

    playerForfeit = () => {
        console.log("A player has forfeited the match");

        if (this.state.userClicked === "") {
            console.log("You did not pick a card!");

            // If user does not pick a card, his/her health becomes 0
            let me = this.state.me;
            me.health = 0;
            this.setState({
                me,
                roundResultText: "You didn't pick a card!  Wake up next time!",
                receivedDmg: true,
                dealtDmg: false
            });
        }
        else if (this.state.opponentClicked === "") {
            console.log("The opponent did not pick a card!");

            // If opponent does not pick a card, his/her health becomes 0
            let opponent = this.state.opponent;
            opponent.health = 0;
            this.setState({
                opponent,
                roundResultText: "Your opponent fell asleep, and didn't pick a card!",
                dealtDmg: true,
                receivedDmg: false
            });
        }
    }

    storeGameText = () => {
        let textOne = "Round: " + this.state.round + " Choose a card.";
        let textTwo = "Time Remaining: ";
        
        this.setState({
            gameTextOne: textOne,
            gameTextTwo: textTwo
        });
    }

    storeBetweenText = () => {
        let textOne;
        let textTwo;

        textOne = this.state.roundResultText;

        if (this.state.me.health === 0 || this.state.opponent.health === 0) {
            textTwo = "Redirecting in "
        }
        else if (this.state.lastRound === true) {
            textTwo = "Redirecting in "
        }
        else {
            textTwo = "Round " + this.state.round + " begins in ";
        }

        this.setState({
            gameTextOne: textOne,
            gameTextTwo: textTwo
        });
    }

    endOfGameText = () => {
        let win = "Congratulations!  You Won!"
        let ifWin = "You have been awarded 5 honor"

        let lose = "BOOOOOOO, You lost!"
        let ifLose = "You have lost 2 honor"


        if (this.state.me.health < this.state.opponent.health) {

            this.setState({
                endTextOne: lose,
                endTextTwo: ifLose
            });
        }
        else {
           this.setState({
               endTextOne: win,
               endTextTwo: ifWin
           }); 
        }

        this.handleGameResult();
    }

    handleGameResult = () => {
        let userObj = {
            _id: this.props.userId
        }

        if (this.state.me.health < this.state.opponent.health) {
            API.userLose(userObj).then(res => {
                // console.log("The LOSE API endpoint-----", res.data);
            }).catch(err => {
                console.log(err);
            });
        }
        else if (this.state.me.health > this.state.opponent.health) {
            API.userWin(userObj).then(res => {
                // console.log("The WIN API endpoint ------", res.data);
            }).catch(err => {
                console.log(err);
            });
        }
    }

    defineClassName = (card) => {
        if (card.revealed && !card.used) {
            return "revealedCard"
        }
        else if (card.used) {
            return "usedCard"
        }
        else {
            return "opponentCards"
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
                            let displayedCardTitle = null;
                            let displayedCardImg = null;
                             if (this.state.opponent.pickedCard.title && this.state.userClicked) {
                                displayedCardTitle = this.state.opponent.pickedCard.title;
                
                                for (let i = 0; i < this.state.cards.length; i++) {
                                    if (displayedCardTitle === this.state.cards[i].title) {
                                        displayedCardImg = this.state.cards[i].img;
                                        console.log("Setting the card image here!", displayedCardImg);
                                    }
                                }
                            }

                            return (
                                <div className="col s3 m3 l3 xl3" key={index}>
                                    {/* <div className={"opponentCards" + card.used? " usedCard" : ""} */}
                                    <div className={ this.defineClassName(card) }
                                        style={ this.state.opponentClicked === card.title ? { top: "20px" } : {} }
                                    >
                                        <div className="card-image">
                                            <img className="cardImg"
                                                src={ this.state.opponent.pickedCard.title && this.state.userClicked && this.state.opponentClicked === card.title ? displayedCardImg : card.img }
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className="row font giveMeHeight valign-wrapper">
                        <div className="col s4 m4 l4">
                            <p>{this.state.opponent.username}</p>
                            <p>health: {this.state.opponent.health}</p>
                        </div>
                        <div className="col s4 m4 l4 center-align">
                            <p
                                // style={ this.state.receivedDmg ? { color: "red" } : {} }
                                // style={ this.state.dealtDmg ? { color: "green" } : {} }
                                style={ this.state.receivedDmg ? { color: "red" } : this.state.dealtDmg ? { color: "green" } : {} }
                            >{this.state.gameTextOne}</p>
                            <p>{this.state.gameTextTwo} {this.state.timerCount}</p>
                        </div>
                        <div className="col s4 m4 l4 right-align">
                            <p>{this.props.username}</p>
                            <p>health: {this.state.me.health}</p>
                        </div>
                    </div>

                    <div className="row" id="cardContainer">
                        {this.state.myCards.map((card, index) => {
                            if (card.used) {
                                return (
                                    <div className="col s3 m3 l3 xl3 cardSelectBot" key={index}>
                                    <div className="card usedCard">
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
                            }
                            else {
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
                            }
                        })}
                    </div>
                </>
            )
        }

        else if (this.state.gameStatus === "end") {
            return (
                <>
                    <BodyClassName className="gamePagePic"></BodyClassName>
                    <div className="container center-align endOfGame">
                        <h5 className="font">{this.state.endTextOne}</h5>
                        <h5 className="font">{this.state.endTextTwo}</h5>
                        <Link to="/home" className="waves-effect waves-light btn-large" id="homePlayBtn">HOME</Link>
                    </div>
                </>
            )
        }

    }

}

export default GamePage;