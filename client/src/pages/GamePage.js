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
            console.log(res);
            this.setState({ cards: res.data });
        }).catch(err => {
            console.log(err);
        });
        console.log(this.state.cards);

        // FIGURE OUT A FUNCTION, THAT WILL SET THE STATE OF BOTH
        // PLAYER ONE CARDS AND PLAYER TWO CARDS OF 
        // FOUR RANDOM CARDS FROM THE CARDS ARRAY
        const test = this.state.cards[Math.floor(Math.random() * this.state.cards.length)];
        console.log(test, "-----TEST");
    }

    drawCards = (cards) => {
        const test = this.state.cards[Math.floor(Math.random() * this.state.cards.length)];
        console.log(test, "-----TEST");
    }


    // Probably will need to map/render over playerOne cards, as well as map/render..
    // .. playerTwo cards.
    render() {
        return (
            <>
                <h1>The Game Page</h1>
            </>
        )
    }

}

export default GamePage;