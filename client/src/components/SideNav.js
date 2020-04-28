import React, { Component } from "react";


// THIS COMPONENT WILL DISPLAY CHAT
// CHAT WILL BE ADDED IN FUTURE VERSION
class SideNav extends Component {

    state = {
        myMessage: "",
        chatMessages: []  //Array of message objects: {username: "123", text: "abc"}
    }

    componentWillMount = () => {
        let messages =  sessionStorage.getItem('messages');
        if (messages) {
            this.setState({chatMessages: JSON.parse(messages)}, function() {
                var objDiv = document.getElementsByClassName("all-messages-field")[0];
                objDiv.scrollTop = objDiv.scrollHeight;
            });
        }
        // Join global chat
        this.props.socket.emit("join chat");

        // Listen to received messages
        this.props.socket.on("receive message", (messageObj) => {
            let chatMessages = this.state.chatMessages;
            chatMessages.push(messageObj);
            this.setState({chatMessages});
            sessionStorage.setItem('messages', JSON.stringify(chatMessages));
            var objDiv = document.getElementsByClassName("all-messages-field")[0];
            objDiv.scrollTop = objDiv.scrollHeight;
        })
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
                    var objDiv = document.getElementsByClassName("all-messages-field")[0];
                    objDiv.scrollTop = objDiv.scrollHeight;
                });

                this.props.socket.emit("send message", {
                    username: this.props.username,
                    text: event.target.value
                })
            }
        }
    }

    componentWillUnmount = () => {
        this.props.socket.emit("leave chat");
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
                            <ul id="messagesList">
                                {this.state.chatMessages.map(messageObj => {
                                    return (
                                        <li className="messageItem">
                                            <span className={messageObj.username === this.props.username? "myMessage" : "otherMessage"}>{messageObj.username}:</span> {messageObj.text} 
                                        </li>
                                    )
                                })}
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