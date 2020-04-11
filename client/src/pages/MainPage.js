import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import HomePage from "./HomePage";
import CollectionPage from "./Collection";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";
import Landing from "./Landing";
import "./MainPage.css";

// Would like to pass the amound of friends that are online through props...
// Might need to add the isLoggedIn state to the App component
class MainPage extends Component {

    // Testing passing state through props
    // Added isLoggedIn, default to true.
    // When logging out, it should set state to false, rendering the Landing page.
    state = {
        username: "ChefBriGuy",
        wins: 5,
        losses: 0,
        rank: 21,
        friends: ["Bob", "Bill", "Sally"],
        isLoggedIn: true
    }

    handleClick = () => {
        this.setState({ isLoggedIn: false });
    }


    render = () => {

        if (!this.state.isLoggedIn) {
            return (
                <Landing ></Landing>
            )
        }

        return (
            <Router >
                <>
                    <Navbar 
                        handleClick={this.handleClick}
                    />
                    <SideNav 
                        username={this.state.username}
                        friends={this.state.friends}
                    />
                    <Wrapper >
                        <Route exact path="/">
                            <HomePage 
                                username={this.state.username}
                                wins={this.state.wins}
                                losses={this.state.losses}
                                rank={this.state.rank}
                            />
                        </Route>
                        <Route exact path="/home">
                            <HomePage 
                                username={this.state.username}
                                wins={this.state.wins}
                                losses={this.state.losses}
                                rank={this.state.rank}
                            />
                        </Route>
                        <Route exact path="/collection">
                            <CollectionPage />
                        </Route>
                    </Wrapper>
                </>
            </Router>
        )
    }
}


export default MainPage;