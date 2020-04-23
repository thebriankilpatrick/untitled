import React, { Component } from "react";
import Landing from "./pages/Landing";
import MainPage from "./pages/MainPage";
import "./App.css";

import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:3000");


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

  logout = () => {
    
    sessionStorage.removeItem("user");
    this.setState({ isLoggedIn: false });
  }

  login = (user) => {

    sessionStorage.setItem("user", JSON.stringify(user));
    this.setState({isLoggedIn: true});

  }
  
  render() {

    if (!this.state.isLoggedIn) {
      return (
          <Landing 
            login={this.login}
          />
      )
    }
    else {
      return (
        <div>
          <MainPage 
            logout={this.logout}
            socket={socket}
          />
        </div>
      );
    }
  }
}


export default App;
