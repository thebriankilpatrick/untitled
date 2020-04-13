import React, { Component } from "react";
import BodyClassName from 'react-body-classname';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LoginModalContent from "../components/LoginModalContent";
import RegisterModalContent from "../components/RegisterModalContent";
import "./Landing.css";
// import MainPage from "./MainPage";


// Render full size picture on body via body className
// After logging out, and rendering Landing page, state should be set to isLoggedIn: false
// Might need to add the isLoggedIn state to the App component

class Landing extends Component {

    // handleLog = () => {
    //     this.setState({ isLoggedIn: true });
    // }

    componentDidMount = () => {

        var event = document.createEvent('Event');
        // Define the event name.
        event.initEvent('LandingPageLoaded', true, true);
        document.dispatchEvent(event)
    }

    clicky = () => {
        console.log('cliiiiiiick');
        // var modal = document.querySelector('#modal1');
        // // modal.modal()
        // modal.open();
        // console.log(modal)
        // var instances = M.Modal.init(elems);
        // $('.modal').modal()
    }

    render(props) {

        // if (this.state.isLoggedIn) {
        //     return (
        //         <MainPage></MainPage>
        //     )
        // }

        return (
            <Router>

                <div >
                    <BodyClassName className="landingPagePic"></BodyClassName>
                    <div className="container" id="initPlayBtn">
                        <a onClick={this.clicky} className="waves-effect waves-light btn-large modal-trigger" data-target="modal1" href="#modal1">PLAY GAME</a>
                        {/* <a onClick={this.clicky} className="waves-effect waves-light btn-large modal-trigger">PLAY GAME</a> */}
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
                                handleLog={this.props.handleLog}
                                // isLoggedIn={this.props.isLoggedIn}
                            />
                        </Route>
                        <Route exact path="/register">
                            <RegisterModalContent 
                                handleLog={this.props.handleLog}
                                // isLoggedIn={this.props.isLoggedIn}
                            />
                        </Route>
                        <Route exact path="/login">
                            <LoginModalContent 
                                handleLog={this.props.handleLog}
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