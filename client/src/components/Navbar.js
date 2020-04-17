import React from "react";
import { Link } from "react-router-dom";


// Need to set the state of Landing page to isLoggedIn: false
// after clicking the logout button
function Navbar(props) {
    return (
        <div className="navbar-fixed">
            <nav>
                <div className="nav-wrapper grey darken-3">
                    <Link to="/" className="brand-logo hide-on-med-and-down" id="navLogo" >Super Smash Kittens</Link>
                    <ul id="nav-mobile" className="right navMargin">
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/collection">Collection</Link></li>
                        <li><Link to="/friends" className="hide-on-large-only">Friends</Link></li>
                        <li><Link to="/" onClick={props.logout} >Logout</Link></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;