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
                <h1>Collection Page</h1>
                
                <div className="row">
                    <div className="col s12 m6">
                        <div className="card blue-grey darken-1 borderHover">
                            <div className="card-content white-text">
                                <img className="cardImg" src={props.cards[0].img} alt={props.cards[0].title}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CollectionPage;