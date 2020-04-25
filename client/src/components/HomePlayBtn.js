import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../utils/API";


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
        // console.log("here is your obj", obj);
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
            <div className="container textColor" id="homePlayBtnContainer">
                <div className="row">
                    <div className="col l4 m4 s4 customFont">
                        <h5 className="username">{this.props.username}</h5>
                        <p>honor: {this.state.rank}</p>
                    </div>

                    <div className="col l4 m4 s4 customFont">
                        <p id="winsCount">wins: {this.state.wins}</p>
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