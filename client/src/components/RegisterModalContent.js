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
        }).catch(error => {
            // console.log(error);
            throw error;
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
                <h4 className="modalHeader" >Register</h4>
                <form>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="email" type="email" className="validate inputLoginRegister" 
                                name="email" 
                                value={this.state.email}
                                onChange={this.handleChange}
                                />
                            <label htmlFor="email">Email</label>
                            <span className="helper-text" data-error="please input an actual email" data-success=""></span>
                        </div>
                        <div className="input-field col s12">
                            <input id="birthday" type="text" className="validate inputLoginRegister" 
                                name="birthday" 
                                value={this.state.birthday}
                                onChange={this.handleChange}
                                />
                            <label htmlFor="birthday">Birthday</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="username" type="text" className="validate inputLoginRegister" 
                                name="username" 
                                value={this.state.username}
                                onChange={this.handleChange}
                                />
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="password" type="password" className="validate inputLoginRegister" 
                                name="password" 
                                value={this.state.password}
                                onChange={this.handleChange}
                                />
                            <label htmlFor="password">Password</label>
                        </div>
                        <a onClick={this.registerNewUser} className="waves-effect waves-light btn btnStyle">Register</a>
                    </div>
                </form>
            </div>
        </>
        )
    }
}

export default RegisterModalContent;