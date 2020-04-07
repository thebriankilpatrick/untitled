import React from "react";
import { Link } from "react-router-dom";


// How to handle "/logout"?
// If linked from MainPage, it needs to completely re render the page as Landing

// If I put Navbar and SideNav components inside HomePage and Collection, then
// I should be able to link "/logout" and render the Landing page.
function Navbar() {
    return (
        <>
            <nav>
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo">Logo</Link>
                    <ul id="nav-mobile" className="right">
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/collection">Collection</Link></li>
                        <li><Link to="/logout">Logout</Link></li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar;