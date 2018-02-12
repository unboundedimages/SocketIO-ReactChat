import React, { Component } from 'react';
import io from 'socket.io-client'
import {USER_CONNECTED} from '../Events'
const socketUrl= "http://localhost:3231"
export default class Layout extends Component {

	constructor(props){
		super(props);

		this.state={
			socket:null,
			user:null
		};
	}

	componentWillMount(){
		this.initSocket()
	}

	initSocket = ()=>{
		const socket = io(socketUrl)
		socket.on('connect', ()=>{
			console.log("Connected");
		})
		this.setState({socket})
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
		return (
			<div className="container">
			  {title}
			</div>
		);
	}
}