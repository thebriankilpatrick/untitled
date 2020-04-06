import React from "react";
import { Link } from "react-router-dom";


// Login button should link to MainPage
function LoginModalContent() {
    return (
        <>
            <div className="modal-content">
                <h4>Login Modal</h4>
                <form>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="email" type="email" className="validate"/>
                            <label for="email">Email</label>
                            <span className="helper-text" data-error="wrong" data-success="right"></span>
                        </div> 
                        <div className="input-field col s12">
                            <input id="password" type="password" className="validate"/>
                            <label for="password">Password</label>
                        </div>
                        <Link to="/" className="waves-effect waves-light btn">Login</Link>    
                    </div>
                </form>
            </div>
        </>
    )
}

export default LoginModalContent;