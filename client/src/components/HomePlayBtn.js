import React from "react";

// Place rank and user info inside container
// Then have "play" button

// Does "play" button need to link to new page?
// It will need to make a call to the db before it can render
function HomePlayBtn() {
    return (
        <div className="container">
            <a class="waves-effect waves-light btn-large" id="homePlayBtn">FIND MATCH</a>
        </div>
    )
}

export default HomePlayBtn;