import React from "react";
import { Link } from "react-router-dom";


function Navbar(props) {
    return (
        <div className="navbar-fixed">
            <nav>
                <div className="nav-wrapper grey darken-3">
                    <Link to="/" className="brand-logo hide-on-med-and-down" id="navLogo" >Super Smash Kittens</Link>
                    <ul id="nav-mobile" className="right navMargin">
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/collection">Collection</Link></li>
                        <li><a className="hide-on-large-only sidenav-trigger" data-target="sideNavColor">Chat</a></li>
                        <li><Link to="/" onClick={props.logout} >Logout</Link></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;