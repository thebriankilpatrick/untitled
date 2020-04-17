import React, { Component } from "react";
import API from "../utils/API";
import "./GamePage.css";

class GamePage extends Component {

    // Probably need to store both playerOne and playerTwo data in state
    state = {
        cards: [],
        playerOneCards: [],
        playerTwoCards: [],
        timer: ""
    }

    componentDidMount = () => {
        API.getCards().then(res => {
            this.setState({ cards: res.data });
            this.drawCards();
        }).catch(err => {
            console.log(err);
        });
    }

    startTimer = () => {
        console.log("Handle functionality for timer");
        // Timer is in state, and needs to be updated via timer function
        // The function will need to be called with each round, so the time resets
        // After each player has chosen, the timer stops, and the battle logic commences.
        // Then, at the start of the next round, the timer is reset and starts back up.

        // Note, if a player does not pick a card within the allotted time, 
        // that player forefeits the match.
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

    cardClick = () => {
        console.log("Handle logic for a card being clicked..");
    }


    // Probably will need to map/render over playerOne cards, as well as map/render..
    // .. playerTwo cards.

    // Right now, there's hardcoded style in CSS to shift up/down on active image. 
    // Basically a "held" click.
    // Need to handle JS to maintain the shift up/down of the image.

    // Should I add state, and have a "selectedCard" within state???
    render() {
        return (
            <>

                <div className="row" id="cardContainer">

                    {this.state.playerOneCards.map((card, index) => {
                        return (
                            <div className="col s3 m3 l3 xl3 cardSelectTop" key={index}>
                                <div className="card blue-grey darken-1 borderHover">
                                    <div className="card-image" id={card.title}>
                                        <img className="cardImg" src={card.img} alt={card.title} data-power={card.power}/>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>

                <div className="row">
                    <div className="col s4 m4 l4">Player One</div>
                    <div className="col s4 m4 l4 center-align">Timer</div>
                    <div className="col s4 m4 l4 right-align">Player Two</div>
                </div>

                <div className="row" id="cardContainer">

                    {this.state.playerTwoCards.map((card, index) => {
                        return (
                            <div className="col s3 m3 l3 xl3 cardSelectBot" key={index}>
                                <div className="card blue-grey darken-1 borderHover">
                                    <div className="card-image" id={card.title}>
                                        <img className="cardImg" src={card.img} alt={card.title} data-power={card.power}/>
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