import React, { Component } from "react";
// import { Link } from "react-router-dom";
import API from "../utils/API";


// Register button should link to MainPage
class RegisterModalContent extends Component {

    state = {
        email: "",
        username: "",
        birthday: "",
        password: ""
    };

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value});
        console.log(name + value);
    }

    registerNewUser = () => {
        const {email, username, birthday, password} = this.state;
        const userObj = {
            email: email,
            username: username,
            birthday: birthday,
            password: password
        };
        console.log(userObj);
        // Success!
        // Need to add API call here to post user to db
        API.registerNewUser(userObj).then(res => {
            if (res.status === 200) {
                // this.props.handleLog() works!!!
                this.loginUser(userObj.email, userObj.password)
            }
        }).catch(err => {
            throw err
        })
    }

    loginUser = (email, password) => {

        const userObj = {
            email: email,
            password: password
        };

        console.log(userObj);
        // Success!
        // Need to add API call here to handle the login and handle authentication
        API.getUser(userObj).then(res => {
            console.log(res);
            if (res.status === 200) {
                // this.props.handleLog() works!!!
                this.props.redirect();
                this.props.login(res.data);
                console.log(res);
            }
        }).catch(err => {
            console.log(err);
        });
    }


    render() {
        return (
        <>
            <div className="modal-content">
                <h4>Register Modal</h4>
                <form>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="email" type="email" className="validate" 
                                name="email" 
                                value={this.state.email}
                                onChange={this.handleChange}
                                />
                            <label for="email">Email</label>
                            <span className="helper-text" data-error="wrong" data-success="right"></span>
                        </div>
                        <div className="input-field col s12">
                            <input id="birthday" type="text" className="validate" 
                                name="birthday" 
                                value={this.state.birthday}
                                onChange={this.handleChange}
                                />
                            <label for="birthday">Birthday</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="username" type="text" className="validate" 
                                name="username" 
                                value={this.state.username}
                                onChange={this.handleChange}
                                />
                            <label for="username">Username</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="password" type="password" className="validate" 
                                name="password" 
                                value={this.state.password}
                                onChange={this.handleChange}
                                />
                            <label for="password">Password</label>
                        </div>
                        <a onClick={this.registerNewUser} className="waves-effect waves-light btn">Register</a>
                    </div>
                </form>
            </div>
        </>
        )
    }
}

export default RegisterModalContent;