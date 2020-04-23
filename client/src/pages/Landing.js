import React, { Component } from "react";
import BodyClassName from 'react-body-classname';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import LoginModalContent from "../components/LoginModalContent";
import RegisterModalContent from "../components/RegisterModalContent";
import "./Landing.css";
// import MainPage from "./MainPage";


class Landing extends Component {

    state = {
        redirect: "",
        loginLink: true,
        registerLink: false
    }


    componentDidMount = () => {

        var event = document.createEvent('Event');

        event.initEvent('LandingPageLoaded', true, true);
        document.dispatchEvent(event)
    }

    redirect = () => {
        this.setState({
            redirect: "/home"
        })
    }

    handleLoginClick = () => {
        this.setState({
            loginLink: true,
            registerLink: false
        });
    }

    handleRegisterClick = () => {
        this.setState({
            registerLink: true,
            loginLink: false
        });
    }


    render(props) {


        if (this.state.redirect === "/home") {
            return (
                <Router >
                    <Redirect to="/home"/>
                </Router>
            )
        }

        return (

            <Router>

                <div >
                    <BodyClassName className="landingPagePic"></BodyClassName>
                    <div className="container" id="initPlayBtn">
                        <a className="waves-effect waves-light btn-large modal-trigger btnStyle" id="playBtnStyle" data-target="modal1" href="#modal1">PLAY GAME</a>
                    </div>

                    <div id="modal1" className="modal">
                        <div className="row align-center">
                            <div className="col l6 m6 s6">
                                <Link to="/login"><h4 className="modalBtn center-align"
                                    style={ this.state.loginLink ? { "backgroundColor": "rgb(102, 102, 102)" } : {} }
                                    onClick={this.handleLoginClick}>Login</h4></Link>
                            </div>
                            <div className="col l6 m6 s6">
                                <Link to="/register"><h4 className="modalBtn center-align" 
                                    style={ this.state.registerLink ? { "backgroundColor": "rgb(102, 102, 102)" } : {} }
                                    onClick={this.handleRegisterClick}>Register</h4></Link>
                            </div>
                        </div>
                        <Route exact path="/">
                            <LoginModalContent  
                                login={this.props.login}
                                redirect={this.redirect}
                                handleRegisterClick={this.handleRegisterClick}
                                // isLoggedIn={this.props.isLoggedIn}
                            />
                        </Route>
                        <Route exact path="/register">
                            <RegisterModalContent 
                                login={this.props.login}
                                redirect={this.redirect}
                                handleLoginClick={this.handleLoginClick}
                                // isLoggedIn={this.props.isLoggedIn}
                            />
                        </Route>
                        <Route exact path="/login">
                            <LoginModalContent 
                                login={this.props.login}
                                redirect={this.redirect}
                                handleRegisterClick={this.handleRegisterClick}
                                // isLoggedIn={this.props.isLoggedIn}
                            />
                        </Route>
                    </div>

                </div>
            </Router>
        )
    }
}

export default Landing;