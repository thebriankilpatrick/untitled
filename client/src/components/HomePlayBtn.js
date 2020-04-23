import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../utils/API";

// Place rank and user info inside container
// Then have "play" button

// Does "play" button need to link to new page?
// It will need to make a call to the db before it can render

// ------------------REMOVE LINK TAG AND REPLACE WITH <a> TAG-------JUST A TEST
class HomePlayBtn extends Component {

    state = {
        wins: "",
        losses: "",
        rank: ""
    }

    componentWillMount = (props) => {
        let userId = this.props.userId;
        let obj = {
            _id: userId
        }
        console.log("here is your obj", obj);
        // let id = this.state.userId;
        API.getUpdatedUser(obj).then(res => {
            this.setState({
                wins: res.data.wins,
                losses: res.data.losses,
                rank: res.data.rank
            });
        });
    }

    render() {
        return (
            <div className="container" id="homePlayBtnContainer">
                <div className="row">
                    <div className="col l4 m4 s4 customFont">
                        <h5>{this.props.username}</h5>
                        <p>honor: {this.state.rank}</p>
                    </div>

                    <div className="col l4 m4 s4 customFont">
                        <p>wins: {this.state.wins}</p>
                        <p>losses: {this.state.losses}</p>
                    </div>

                    <div className="col l4 m4 s4">
                        <Link to="/game" onClick={this.props.findMatch} className="waves-effect waves-light btn-large" id="homePlayBtn">FIND MATCH</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePlayBtn;