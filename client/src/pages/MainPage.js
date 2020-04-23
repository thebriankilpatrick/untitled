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

// Would like to pass the amound of friends that are online through props...
// Might need to add the isLoggedIn state to the App component
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

    // HEY YOUUUU-----------------------------------------------------------------------------------------------
    // TODO: 
    // I called the function to get the user from the DB on mount
    // This will allow me to grab the most up-to-date wins, losses, and rank from the DB
    // However, this function only runs when the component mounts (load and reload)
    componentDidMount = () => {
        this.props.socket.emit("test");
        const user = sessionStorage.getItem("user");
        const userObj = JSON.parse(user);
        // console.log("------------------------------------",userObj._id);
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
            // let id = this.state.userId;
            API.findUser(obj).then(res => {
                this.setState({
                    wins: res.data.wins,
                    losses: res.data.losses,
                    rank: res.data.rank
                });
            });
        });
        // console.log(this.state.friends);
        API.getCards().then(res => {
            // console.log(res);
            this.setState({ cards: res.data });
        }).catch(err => {
            console.log(err);
        });
    }

    componentWillUpdate = (newProps, newState) => {
        console.log(newProps, newState);
    }

    componentDidUpdate = () => {
        console.log("Component has been updated");
    }

    findMatch = () => {
        // Button click works!--
        console.log("HANDLE THIS FUNCTIONALITY");
        // Need to find a game record where playerOne has a value, and playerTwo does not.
        // If no game record exist, or exists with conditions above,
        // then create new game record.
        // If the above does exists, then update the record with playerTwo info



        
    }


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