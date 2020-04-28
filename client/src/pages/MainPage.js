import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import HomePage from "./HomePage";
import CollectionPage from "./Collection";
import GamePage from "./GamePage";
// import FriendsPage from "./FriendsPage";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";
import API from "../utils/API";
// import Landing from "./Landing";
import "./MainPage.css";


// HEY YOUUUUU -------------------------------------------------------------------
// TODO:
// HOW DO I WANT TO STYLE THIS PAGE???????
// SPECIFICALLY THE HOMEPAGE
// ALSO NEED TO FIGURE OUT WHAT TO DO WITH SIDENAV...
class MainPage extends Component {

    state = {
        username: "",
        userId: "",
        wins: "",
        losses: "",
        rank: "",
        friends: [],
        cards: []
        // isLoggedIn: true
    }

    componentDidMount = () => {
        this.props.socket.emit("join chat");

        const user = sessionStorage.getItem("user");
        const userObj = JSON.parse(user);

        this.setState({
            username: userObj.username,
            userId: userObj._id,
            wins: userObj.wins,
            losses: userObj.losses,
            rank: userObj.rank,
            friends: userObj.friend
        }, function() {
            let obj = {
                _id: this.state.userId
            }

            API.findUser(obj).then(res => {
                this.setState({
                    wins: res.data.wins,
                    losses: res.data.losses,
                    rank: res.data.rank
                });
            });
        });

        API.getCards().then(res => {
            this.setState({ cards: res.data });
        }).catch(err => {
            console.log(err);
        });

        console.log("Show Side Nav click registered")
        var event = document.createEvent('Event');

        event.initEvent('showSideNav', true, true);
        document.dispatchEvent(event)
    }

    componentWillUpdate = (newProps, newState) => {
        console.log(newProps, newState);
    }

    componentDidUpdate = () => {
        console.log("Component has been updated");
    }

    findMatch = () => {
        console.log("Tesing functionality");    
    }

    componentWillUnmount = () => {
        this.props.socket.emit("leave chat");
    }

    // showSideNav = () => {
    //     console.log("Show Side Nav click registered")
    //     var event = document.createEvent('Event');

    //     event.initEvent('showSideNav', true, true);
    //     document.dispatchEvent(event)
    // }


    render = (props) => {

        return (
            <Router >
                <>
                    <Navbar 
                        logout={this.props.logout}
                    />
                    <SideNav 
                        username={this.state.username}
                        friends={this.state.friends}
                        socket={this.props.socket}
                    />
                    <Wrapper >
                        <Route exact path="/">
                            <HomePage 
                                username={this.state.username}
                                wins={this.state.wins}
                                losses={this.state.losses}
                                rank={this.state.rank}
                                findMatch={this.findMatch}
                                socket={this.props.socket}
                                userId={this.state.userId}
                            />
                        </Route>
                        <Route exact path="/home">
                            <HomePage 
                                username={this.state.username}
                                wins={this.state.wins}
                                losses={this.state.losses}
                                rank={this.state.rank}
                                findMatch={this.findMatch}
                                socket={this.props.socket}
                                userId={this.state.userId}
                            />
                        </Route>
                        <Route exact path="/collection">
                            <CollectionPage 
                                cards={this.state.cards}
                            />
                        </Route>
                        {/* <Route exact path="/friends">
                            <FriendsPage 
                                socket={this.props.socket}
                            />
                        </Route> */}
                        <Route exact path="/game">
                            <GamePage 
                                socket={this.props.socket}
                                username={this.state.username}
                                userId={this.state.userId}
                            />
                        </Route>
                    </Wrapper>
                </>
            </Router>
        )
    }
}


export default MainPage;