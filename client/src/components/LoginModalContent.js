import React, { Component } from "react";
// import { Link } from "react-router-dom";
import API from "../utils/API";


// Login button should link to MainPage
class LoginModalContent extends Component {

    state = {
        email: "",
        password: ""
    }

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value});
        console.log(name + value);
    }

    loginUser = (props) => {
        const {email, password} = this.state;
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
                // this.props.handleLog();
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
                    <h4>Login Modal</h4>
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
                                <input id="password" type="password" className="validate"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                                <label for="password">Password</label>
                            </div>
                            <a onClick={this.loginUser} className="waves-effect waves-light btn">Login</a>    
                        </div>
                    </form>
                </div>
            </>
        )
    }
}

export default LoginModalContent;