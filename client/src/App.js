import React, { Component } from "react";
import Landing from "./pages/Landing";
import MainPage from "./pages/MainPage";
import "./App.css";


// How to handle getting user info here??
class App extends Component {
  
  state = {
    isLoggedIn: false,
    username: "",
    wins: "",
    losses: "",
    rank: "",
    friends: []
  }

  componentDidMount = () => {
    const user = sessionStorage.getItem('user');
    user ? this.setState({isLoggedIn: true}) : this.setState({isLoggedIn: false})
  }

  getUser = () => {

    console.log("What logic to put here to get the logged in user info???");
    // Use passport session storage to log the userID, and then make a get request
    // to the db with that userID?
  }

  handleClick = () => {
    
    // window.location.reload();
    sessionStorage.removeItem("user");
    this.setState({ isLoggedIn: false });
  }

  handleLog = (user) => {
    // this.setState({ isLoggedIn: true });
    // Save data to sessionStorage
    // user.remove("password");
    sessionStorage.setItem("user", JSON.stringify(user));
    this.setState({isLoggedIn: true});

  }
  
  render() {

    if (!this.state.isLoggedIn) {
      return (
          <Landing 
            handleLog={this.handleLog}
          />
      )
    }
    else {
      return (
        <div>
          <MainPage 
            handleClick={this.handleClick}
          />
        </div>
      );
    }
  }
}


export default App;
