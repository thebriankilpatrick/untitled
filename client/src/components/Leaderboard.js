import React, { Component } from "react";
import API from "../utils/API";

class Leaderboard extends Component {

    state = {
        users: []
    }

    componentDidMount = () => {
        API.getAllUsers().then(res => {
            this.setState({
                users: res.data
            }, function() {
                this.state.users.sort((a, b) => (a.rank < b.rank) ? 1 : -1);
            });
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <div className="container">
                <table>
                    <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Username</th>
                        <th>Honor</th>
                    </tr>
                    </thead>

                    <tbody>
                        {this.state.users.slice(0, 5).map((user, index) => {
                            return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.rank}</td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Leaderboard;