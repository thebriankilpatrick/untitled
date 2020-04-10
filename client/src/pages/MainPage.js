import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import HomePage from "./HomePage";
import CollectionPage from "./Collection";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";
import "./MainPage.css";

// Would like to pass the amound of friends that are online through props...
class MainPage extends Component {

    // Testing passing state through props
    state = {
        username: "ChefBriGuy",
        wins: 5,
        losses: 0,
        rank: 21,
        friends: ["Bob", "Bill", "Sally"]
    }


    render = () => {
        console.log(this.state.username);

        return (
            <Router >
                <>
                    <Navbar ></Navbar>
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