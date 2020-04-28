import React, { Component } from "react";


// THIS COMPONENT WILL DISPLAY CHAT
// CHAT WILL BE ADDED IN FUTURE VERSION
class SideNav extends Component {

    state = {
        myMessage: "",
        chatMessages: []
    }

    componentWillMount = () => {
        let messages =  sessionStorage.getItem('messages');
        if (messages) {
            this.setState({chatMessages: JSON.parse(messages)})
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            console.log('SEND MESSAGE');
            if(event.target.value && event.target.value !== "") {
                let chatMessages = this.state.chatMessages;
                chatMessages.push({
                    username: this.props.username,
                    text: event.target.value
                })
                console.log('chatMessages', chatMessages)
                this.setState({myMessage: "", chatMessages}, function() {
                    console.log("state chatMessages", this.state.chatMessages);
                    sessionStorage.setItem('messages', JSON.stringify(this.state.chatMessages));
                });
                
            }
        }
    }

    render() {
        return (
            <div>
                <div id="nav-mobile" className="sidenav sidenav-fixed right-aligned" id="sideNavColor">
                    <nav>
                        <div className="nav-wrapper grey darken-3">
                            <a className="brand-logo center username">{this.props.username}</a>
                        </div>
                    </nav>
                    <div id="chatBox">
                        <div className="all-messages-field col s12">
                            <ul>

                            </ul>
                        </div>
                        <div className="input-field col s12" id="messageInput">
                            <input id="chatInput" type="text"
                                name="myMessage"
                                value={this.state.myMessage}
                                onChange={this.handleChange}
                                onKeyDown={this.handleKeyDown}
                            />
                            <label htmlFor="chat">Message</label>
                        </div>
                    </div>
                    {/* <li className="sideNavLink">Friends ({props.friends.length})</li>
                    <li className="sideNavLink">Messages</li> */}
                </div>
            </div>
        )
    }
}

export default SideNav;