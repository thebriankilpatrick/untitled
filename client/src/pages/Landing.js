import React from "react";
import BodyClassName from 'react-body-classname';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LoginModalContent from "../components/LoginModalContent";
import RegisterModalContent from "../components/RegisterModalContent";
import "./Landing.css";


// Render full size picture on body via body className

// How to handle rendering of two diff modals??
// On Landing component, have the parent modal div
// within that, two buttons for "login" and "register"
// Depending on button click, it will render different content???
function Landing() {
    return (
        <Router>
            <div >
                <BodyClassName className="landingPagePic"></BodyClassName>
                <div className="container" id="initPlayBtn">
                    <Link to="/login" className="waves-effect waves-light btn-large modal-trigger" data-target="modal1" href="#modal1">PLAY GAME</Link>
                </div>

                <div id="modal1" className="modal">
                    <Link to="/register"><h4>Register</h4></Link>
                    <Link to="/login"><h4>Login</h4></Link>
                    <Route exact path="/register" component={RegisterModalContent}/>
                    <Route exact path="/login" component={LoginModalContent}/>
                </div>

            </div>
        </Router>
    )
}

export default Landing;