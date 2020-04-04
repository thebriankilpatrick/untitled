import React from "react";
import { Link } from "react-router-dom";

function RegisterModalContent() {
    return (
        <>
            <div className="modal-content">
                <h4>Register Modal</h4>
                <form>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="email" type="email" className="validate"/>
                            <label for="email">Email</label>
                            <span className="helper-text" data-error="wrong" data-success="right"></span>
                        </div>
                        <div className="input-field col s12">
                            <input id="birthday" type="text" className="validate"/>
                            <label for="birthday">Birthday</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="username" type="text" className="validate"/>
                            <label for="username">Username</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="password" type="password" className="validate"/>
                            <label for="password">Password</label>
                        </div>
                        <Link to="/" className="waves-effect waves-light btn">Register</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default RegisterModalContent;