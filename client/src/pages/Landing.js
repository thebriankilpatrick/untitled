import React from "react";
import BodyClassName from 'react-body-classname';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LoginModalContent from "../components/LoginModalContent";
import RegisterModalContent from "../components/RegisterModalContent";
import "./Landing.css";


// Render full size picture on body via body className


function Landing() {
    return (
        <Router>
            <div >
                <BodyClassName className="landingPagePic"></BodyClassName>
                <div className="container" id="initPlayBtn">
                    <a className="waves-effect waves-light btn-large modal-trigger" data-target="modal1" href="#modal1">PLAY GAME</a>
                </div>

                <div id="modal1" className="modal">
                    <div className="row align-center">
                        <div className="col l6 m6 s6">
                            <Link to="/login"><h4 className="modalBtn center-align">Login</h4></Link>
                        </div>
                        <div className="col l6 m6 s6">
                            <Link to="/register"><h4 className="modalBtn center-align">Register</h4></Link>
                        </div>
                    </div>
                    <Route exact path="/" component={RegisterModalContent}/>
                    <Route exact path="/register" component={RegisterModalContent}/>
                    <Route exact path="/login" component={LoginModalContent}/>
                </div>

            </div>
        </Router>
    )
}

export default Landing;