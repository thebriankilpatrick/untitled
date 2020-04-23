import React from "react";
import "./Collection.css";


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