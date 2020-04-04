import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <>
            <nav>
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo">Logo</Link>
                    <ul id="nav-mobile" className="right">
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/collection">Collection</Link></li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar;