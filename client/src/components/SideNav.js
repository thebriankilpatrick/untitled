import React from "react";


// How to display friends and messages?
// Drop downs imply that the content will not stay dropped down after viewing
function SideNav() {
    return (
        <>
            <ul id="nav-mobile" className="sidenav sidenav-fixed">
                <nav>
                    <div className="nav-wrapper">
                        <a className="brand-logo center">Username</a>
                    </div>
                </nav>
                <li>friends</li>
                <li>Messages</li>
            </ul>
        </>
    )
}

export default SideNav;