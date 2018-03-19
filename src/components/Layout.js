import React, { Component } from 'react';
import io from 'socket.io-client'
import { USER_CONNECTED, LOGOUT, VERIFY_USER } from '../Events'
import LoginForm from './LoginForm'
import ChatContainer from './chats/ChatContainer'

const socketUrl= "http://192.168.0.4:3231"
export default class Layout extends Component {

	constructor(props){
		super(props);

		this.state={
			socket:null,
			user:null
		};
	}

	componentWillMount() {
		this.initSocket()
	}

	// initSocket = ()=>{
	// 	const socket = io(socketUrl)
	// 	socket.on('connect', ()=>{
	// 		console.log("Connected");
	// 	})
	// 	this.setState({socket})
	// }

	initSocket = ()=>{
		const socket = io(socketUrl)

		socket.on('connect', ()=>{
			if(this.state.user){
				this.reconnect(socket)
			}else{
				console.log("connected")
			}
		})
		
		this.setState({socket})
	}

	reconnect = (socket) => {
		socket.emit(VERIFY_USER, this.state.user.name, ({ isUser, user })=>{
			if(isUser){
				this.setState({ user:null })
			}else{
				this.setUser(user)
			}
		})
	}

	setUser = (user)=>{
		const { socket } = this.state
		socket.emit(USER_CONNECTED, user); /* user this connected is passed to a list of users signed in on the server*/
		this.setState({user})
	}

	/* user disconnect */

	logout = ()=>{
		const { socket } = this.state
		socket.emit(LOGOUT)
		this.setState({user:null})
	}

	render() {
		const { title } = this.props
		const { socket, user } = this.state
		return (
			<div className="container">
				{
					!user ?
			  		<LoginForm socket={socket} setUser={this.setUser}/>
			  		:
			  		<ChatContainer title={title} socket={socket} user={user} logout={this.logout}/>
				}
			
			</div>
		);
	}
}