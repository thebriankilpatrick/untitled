import React from "react";


// How to display friends and messages?
// Drop downs imply that the content will not stay dropped down after viewing

// On li - Friends, the (#online) will refer to the props that is passed to 
// loop over how many friends that are online.
// This will be a "Nice-to-have"
function SideNav(props) {

    for (let i = 0; i < props.friends.length; i++) {
        // Or maybe... Display total friends, not online friends...???
        // But online friends would be slightly more impressive
        console.log("Handle logic to sort through friends to find out which ones are online?")
    }


    return (
        <>
            <ul id="nav-mobile" className="sidenav sidenav-fixed">
                <nav>
                    <div className="nav-wrapper grey darken-3">
                        <a className="brand-logo center">{props.username}</a>
                    </div>
                </nav>
                <li className="sideNavLink">Friends ({props.friends.length})</li>
                <li className="sideNavLink">Messages</li>
            </ul>
        </>
    )
}

export default SideNav;