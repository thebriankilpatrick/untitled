import React, { Component } from "react";
import Landing from "./pages/Landing";
import MainPage from "./pages/MainPage";
import "./App.css";


// How to handle getting user info here??
class App extends Component {
  
  state = {
    // isLoggedIn: false,
    username: "",
    wins: "",
    losses: "",
    rank: "",
    friends: []
  }

  getUser = () => {

    console.log("What logic to put here to get the logged in user info???");
    // Use passport session storage to log the userID, and then make a get request
    // to the db with that userID?
  }

  handleClick = () => {
    this.setState({ isLoggedIn: false });
    // window.location.reload();
  }

  handleLog = () => {
    this.setState({ isLoggedIn: true });
  }
  
  render() {

    if (!this.state.isLoggedIn) {
      return (
          <Landing 
            handleLog={this.handleLog}
          />
      )
    }

    return (
      <div>
        <MainPage 
          handleClick={this.handleClick}
        />
      </div>
    );
  }
}


export default App;
