import React from "react";
import "./Collection.css";

// const cardCollection = [];

// Use function to call database for cards, and store in cardCollection var.
// Then map over cardCollection and render for each card

// Add className="borderHover" for hover effect
function CollectionPage() {
    return (
        <>
            <div className="container">
                <h1>Collection Page</h1>
                
                <div className="row">
                    <div className="col s12 m6">
                    <div className="card blue-grey darken-1 borderHover">
                        <div className="card-content white-text">
                        <span className="card-title">Replace Me</span>
                        <p>This should be replaced with the actual card's image</p>
                        </div>
                        <div className="card-action">
                        <a href="#">This is a link</a>
                        <a href="#">This is a link</a>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CollectionPage;