import React from "react";

// Place rank and user info inside container
// Then have "play" button

// Does "play" button need to link to new page?
// It will need to make a call to the db before it can render
function HomePlayBtn(props) {
    return (
        <div className="container" id="homePlayBtnContainer">
            <div className="row">
                <div className="col l6 m6 s6 customFont">
                    <h6>{props.username}</h6>
                    <p>wins: {props.wins}</p>
                    <p>losses: {props.losses}</p>
                </div>

                <div className="col l6 m6 s6">
                    <a onClick={props.findMatch} className="waves-effect waves-light btn-large" id="homePlayBtn">FIND MATCH</a>
                </div>
            </div>
        </div>
    )
}

export default HomePlayBtn;