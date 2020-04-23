import React from "react";


// THIS COMPONENT WILL DISPLAY CHAT
// CHAT WILL BE ADDED IN FUTURE VERSION
function SideNav(props) {


    return (
        <div>
            <ul id="nav-mobile" className="sidenav sidenav-fixed right-aligned">
                <nav>
                    <div className="nav-wrapper grey darken-3">
                        <a className="brand-logo center">{props.username}</a>
                    </div>
                </nav>
                {/* <li className="sideNavLink">Friends ({props.friends.length})</li>
                <li className="sideNavLink">Messages</li> */}
            </ul>
        </div>
    )
}

export default SideNav;