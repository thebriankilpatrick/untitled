import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../utils/API";
import { withAlert } from 'react-alert'

class LoginModalContent extends Component {

    state = {
        email: "",
        password: "",
        incorrect: false,
    }

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    loginUser = () => {

        this.setState({
            incorrect: false
        });

        const {email, password} = this.state;
        const userObj = {
            email: email,
            password: password
        };

        API.getUser(userObj).then(res => {
            console.log(res);
            if (res.status === 200) {

                this.props.redirect();
                this.props.login(res.data);
            }
        }).catch(err => {
            this.setState({
                incorrect: true
            }, function() {
                // Display React-Alert if email or password is incorrect
                this.props.alert.show("Either email or password is incorrect.");
            }
            );
            console.log(err);
        });
    }


    render() {

        return (
            <>
                <div className="modal-content">
                    {/* <h4 className="modalHeader center-align">Login</h4> */}
                    <form>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="email" type="email" className="validate inputLoginRegister"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    autoComplete="off"
                                />
                                <label className="labelLoginRegister" htmlFor="email">Email</label>
                                <span className="helper-text" data-error="please input an email" data-success=""></span>
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
                                <a onClick={this.loginUser} className="modal-close waves-effect waves-light btn btnStyle mdlBtn">Login</a>
                                <Link to="/register"><p onClick={this.props.handleRegisterClick} className="modalText">Don't have an account? Click here to register!</p></Link>
                            </div>   
                        </div>
                    </form>
                </div>
            </>
        )
    }
}

export default withAlert()(LoginModalContent);