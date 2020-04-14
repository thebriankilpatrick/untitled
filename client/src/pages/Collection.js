import React from "react";
import "./Collection.css";

// const cardCollection = [];

// Use function to call database for cards, and store in cardCollection var.
// Then map over cardCollection and render for each card

// Add className="borderHover" for hover effect

// Passed test card image through props.
// you will need to map over array to display all cards
// also, don't forget to actually set the cards to the user, not call cards from db...
function CollectionPage(props) {
    return (
        <>
            <div className="container">
                
                <div className="row" id="cardContainer">

                    {props.cards.map((card, index) => {
                        return (
                            <div className="col s6 m4 l6 xl4" key={index}>
                                <div className="card blue-grey darken-1 borderHover">
                                    <div className="card-image" id={card.title} data-power={card.power}>
                                        <img className="cardImg" src={card.img} alt={card.title}/>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </>
    )
}

export default CollectionPage;