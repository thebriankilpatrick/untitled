import React, { Component } from "react";
import BodyClassName from 'react-body-classname';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import LoginModalContent from "../components/LoginModalContent";
import RegisterModalContent from "../components/RegisterModalContent";
import "./Landing.css";
import MainPage from "./MainPage";


// Render full size picture on body via body className
// Use isLoggedIn to handle rendering of either Landing or MainPage components
// When clicking the "Login" button, it should set the isLoggedIn state to true

class Landing extends Component {
    state = {
        isLoggedIn: false
    };

    handleLog = () => {
        this.setState({ isLoggedIn: true });
    }

    render() {

        if (this.state.isLoggedIn) {
            return (
                <MainPage></MainPage>
            )
        }

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
                        <Route exact path="/">
                            <RegisterModalContent 
                                handleLog={this.handleLog}
                            />
                        </Route>
                        <Route exact path="/register">
                            <RegisterModalContent 
                                handleLog={this.handleLog}
                            />
                        </Route>
                        <Route exact path="/login">
                            <LoginModalContent 
                                handleLog={this.handleLog}
                            />
                        </Route>
                    </div>

                </div>
            </Router>
        )
    }
}

export default Landing;