import React, { Component } from "react";
import Landing from "./pages/Landing";
import MainPage from "./pages/MainPage";
import "./App.css";


// MainPage will be imported from Landing
// And Landing will be rendered here.

// Should I handle the conditional rendering here, for logged in or not??
class App extends Component {
  
  state = {
    isLoggedIn: false
  }

  handleClick = () => {
    this.setState({ isLoggedIn: false });
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
