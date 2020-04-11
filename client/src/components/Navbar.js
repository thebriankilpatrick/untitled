import React from "react";
import { Link } from "react-router-dom";


// Need to set the state of Landing page to isLoggedIn: false
// after clicking the logout button
function Navbar(props) {
    return (
        <>
            <nav>
                <div className="nav-wrapper grey darken-3">
                    <Link to="/" className="brand-logo hide-on-med-and-down">Super Smash Kittens</Link>
                    <ul id="nav-mobile" className="right">
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/collection">Collection</Link></li>
                        <li><Link to="/" onClick={props.handleClick} >Logout</Link></li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar;