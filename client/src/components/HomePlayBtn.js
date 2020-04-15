import React from "react";
import { Link } from "react-router-dom";

// Place rank and user info inside container
// Then have "play" button

// Does "play" button need to link to new page?
// It will need to make a call to the db before it can render

// ------------------REMOVE LINK TAG AND REPLACE WITH <a> TAG-------JUST A TEST
function HomePlayBtn(props) {
    return (
        <div className="container" id="homePlayBtnContainer">
            <div className="row">
                <div className="col l4 m4 s4 customFont">
                    <h5>{props.username}</h5>
                    <p>honor: {props.rank}</p>
                </div>

                <div className="col l4 m4 s4 customFont">
                    <p>wins: {props.wins}</p>
                    <p>losses: {props.losses}</p>
                </div>

                <div className="col l4 m4 s4">
                    <Link to="/game" onClick={props.findMatch} className="waves-effect waves-light btn-large" id="homePlayBtn">FIND MATCH</Link>
                </div>
            </div>
        </div>
    )
}

export default HomePlayBtn;