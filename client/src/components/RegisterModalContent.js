import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAlert } from 'react-alert'
import API from "../utils/API";


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
    }

    registerNewUser = () => {
        const {email, username, birthday, password} = this.state;
        const userObj = {
            email: email,
            username: username,
            birthday: birthday,
            password: password
        };
        API.registerNewUser(userObj).then(res => {
            if (res.status === 200) {
                this.loginUser(userObj.email, userObj.password)
            }
        }).catch(error => {
            // Display React-Alert if username or email exists
            this.props.alert.show("Either email or username already exists.");
            throw error;
        })
    }

    // If success, logs user in directly after registering
    loginUser = (email, password) => {

        const userObj = {
            email: email,
            password: password
        };

        API.getUser(userObj).then(res => {
            console.log(res);
            if (res.status === 200) {

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
                {/* <h4 className="modalHeader center-align" >Register</h4> */}
                <form>
                    <div className="row">
                        <div className="input-field col s12" id="lessMargin">
                            <input id="email" type="email" className="validate inputLoginRegister" 
                                name="email" 
                                value={this.state.email}
                                onChange={this.handleChange}
                                autoComplete="off"
                                />
                            <label htmlFor="email">Email</label>
                            <span className="helper-text" data-error="please input an actual email" data-success=""></span>
                        </div>
                        {/* <div className="input-field col s12">
                            <input id="birthday" type="text" className="validate inputLoginRegister" 
                                name="birthday" 
                                value={this.state.birthday}
                                onChange={this.handleChange}
                                />
                            <label htmlFor="birthday">Birthday</label>
                        </div> */}
                        <div className="input-field col s12">
                            <input id="username" type="text" className="validate inputLoginRegister" 
                                name="username" 
                                value={this.state.username}
                                onChange={this.handleChange}
                                autoComplete="off"
                                />
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="password" type="password" className="validate inputLoginRegister" 
                                name="password" 
                                value={this.state.password}
                                onChange={this.handleChange}
                                autoComplete="off"
                                />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="center-align">
                            <a onClick={this.registerNewUser} className="modal-close waves-effect waves-light btn btnStyle mdlBtn">Register</a>
                            <Link to="/login"><p onClick={this.props.handleLoginClick} className="modalText">Already have an account?  Login here!</p></Link>
                        </div>
                    </div>
                </form>
            </div>
        </>
        )
    }
}

export default withAlert()(RegisterModalContent);