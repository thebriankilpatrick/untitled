import React from "react";
import BodyClassName from 'react-body-classname';
import "./Landing.css";


// Render full size picture on body via body className

// How to handle rendering of two diff modals??
// On Landing component, have the parent modal div
// within that, two buttons for "login" and "register"
// Depending on button click, it will render different content???
function Landing() {
    return (
        <div >
            <BodyClassName className="landingPagePic"></BodyClassName>
            <div className="container" id="initPlayBtn">
                <a className="waves-effect waves-light btn-large modal-trigger" data-target="modal1" href="#modal1">PLAY GAME</a>
            </div>

            <div id="modal1" className="modal">
                <div className="modal-content">
                    <h4>Modal Header</h4>
                    <p>A bunch of text</p>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
                </div>
            </div>

        </div>
    )
}

export default Landing;