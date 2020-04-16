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

        API.getUser(userObj).then(res => {
            console.log(res);
            if (res.status === 200) {

                this.props.redirect();
                this.props.login(res.data);
                console.log(res);
            }
        }).catch(err => {
            alert("Either username or password is incorrect.");
            console.log(err);
        });
    }


    render() {
        return (
            <>
                <div className="modal-content">
                    <h4 className="modalHeader">Login</h4>
                    <form>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="email" type="email" className="validate inputLoginRegister"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                                <label className="labelLoginRegister" htmlFor="email">Email</label>
                                <span className="helper-text" data-error="please input an email" data-success=""></span>
                            </div> 
                            <div className="input-field col s12">
                                <input id="password" type="password" className="validate inputLoginRegister"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                            <a onClick={this.loginUser} className="modal-close waves-effect waves-light btn btnStyle">Login</a>    
                        </div>
                    </form>
                </div>
            </>
        )
    }
}

export default LoginModalContent;