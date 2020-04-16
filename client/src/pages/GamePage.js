import React, { Component } from "react";
import API from "../utils/API";

class GamePage extends Component {

    // Probably need to store both playerOne and playerTwo data in state
    state = {
        cards: [],
        playerOneCards: [],
        playerTwoCards: []
    }

    componentDidMount = () => {
        API.getCards().then(res => {
            this.setState({ cards: res.data });
            this.drawCards();
        }).catch(err => {
            console.log(err);
        });
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


    // Probably will need to map/render over playerOne cards, as well as map/render..
    // .. playerTwo cards.
    render() {
        return (
            <>

                <div className="row" id="cardContainer">

                    {this.state.playerOneCards.map((card, index) => {
                        return (
                            <div className="col s3 m3 l3 xl3" key={index}>
                                <div className="card blue-grey darken-1 borderHover">
                                    <div className="card-image" id={card.title}>
                                        <img className="cardImg" src={card.img} alt={card.title} data-power={card.power}/>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>

                <h1>The Game Page</h1>

                <div className="row" id="cardContainer">

                    {this.state.playerTwoCards.map((card, index) => {
                        return (
                            <div className="col s3 m3 l3 xl3" key={index}>
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