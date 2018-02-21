import React, { Component } from 'react';
import SideBar from './SideBar'
export default class ChatContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			chats:[],
			activeChat:null
		};
	}

	componentDidMount() {
		const { socket } = this.props
		socket.emit(COMMUNIT_CHAT, this.resetChat)

	}

	resetChat(chat){
		return this.addChat(chat, true)
	}

	addChat(chat, reset){
		const { socket } = this.props
		const { chats } = this.state

		const newChats = reset ? [chat]:[...chats, chat]
		this.setState({chats:newChats})

		const messageEvent = `${MESSAGE_RECEIVED}}-${chat-id}}`
		const typingEvent = `${TYPING}-${chat-id}}`
	}

	sendMessage = (chatId, message)=>{
		const { socket } = this.props
		socket.emit(MESSAGE_SENT, {chatId, message} )
	}


	sendTyping  = (chatId, isTyping)=>{
		const { socket } = this.props
		socket.emit(TYPING, {chatId, isTyping} )
	}

	setActiveChat = (activeChat)=>{
		this.setState({activeChat})
	}
	render() {
		const { user, logout } = this.props
		const { chats, activeChat} = this.state
		return (
			<div className="container">
					<SideBar
						logout={logout}
						chats={chats}
						user={user}
						activeChat={activeChat}
						setActiveChat={this.setActiveChat}
						/>
					<div class="chat-room-container">
						{
							activeChat !== null ? (

								<div className="chat-room">
									<ChatHeading name={activeChat.name}/>
									<Messages
										messages={activeChat.messages}
										user={user}
										typingUsers={activeChat.typingUsers}
									/>
									<MessageInput
										sendMessage{
											(message)=>{
												this.sendMessage(activeChat.id, message)
											}
										}
										sendTyping=>{
											(isTyping)=>{
												this.sendTyping(activeChat.id, isTyping)
											}
										}

									/>

								</div>

							)
						}
					</div>		
			</div>
		);
	}
}