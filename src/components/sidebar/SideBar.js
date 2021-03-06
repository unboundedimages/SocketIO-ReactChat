import React, { Component } from 'react';
import FAChevronDown from 'react-icons/lib/md/keyboard-arrow-down'
import FAMenu from 'react-icons/lib/fa/list-ul'
import FASearch from 'react-icons/lib/fa/search'
import MdEject from 'react-icons/lib/md/eject'
import SideBarOption from './SideBarOption'
import { last, get, differenceBy } from 'lodash'
import { createChatNameFromUsers } from '../../Factories'

export default class SideBar extends Component{
		static type = {
			USERS: "users",
			CHATS: "chats"
		}
		constructor(props){
			super(props)
			this.state = {
				receiver:"",
				activeSidebar: SideBar.type.CHATS
			}
		}
		handleSubmit = (e) => {
			e.preventDefault()
			const { receiver } = this.state
			const { onSendPrivateMessage } = this.props

			onSendPrivateMessage(receiver)
			this.setState({receiver:""})
		}
		addChatForUser = (receiver) => {
			this.props.onSendPrivateMessage(receiver)
			this.setActiveSideBar(SideBar.type.CHATS)
		}
		setActiveSideBar = (type) => {
			this.setState({ activeSideBar:type })
		}
	render(){
		const { chats, activeChat, user, setActiveChat, logout, users} = this.props
		const { receiver, activeSideBar } = this.state
		return (
			<div id="side-bar">
					<div className="heading">
						<div className="app-name">Who's online <FAChevronDown /><FAChevronDown /><FAChevronDown /></div>
						<div className="menu">
							<FAMenu />
						</div>
					</div>					
					<div className="side-bar-select">
						<div 
							onClick = { ()=>{ this.setActiveSideBar(SideBar.type.CHATS) } }
							className={`side-bar-select__option ${ activeSideBar === SideBar.type.CHATS ? 'active':''}`}>
							<span>Chats</span>
						</div>
						<div 
							onClick = { ()=>{ this.setActiveSideBar(SideBar.type.USERS) } }
							className={`side-bar-select__option ${ activeSideBar === SideBar.type.USERS ? 'active':''}`}>
							<span>Users</span>
						</div>
					</div>
					<div 
						className="users" 
						ref='users' 
						onClick={(e)=>{ (e.target === this.refs.user) && setActiveChat(null) }}>
						
						{
						activeSideBar === SideBar.type.CHATS ?	
						chats.map((chat)=>{
							return(
							<SideBarOption key = {chat.id} lastMessage = {get(last(chat.messages), 'message', '')}	name = {chat.isCommunity ? chat.name : createChatNameFromUsers(chat.users, user.name)} active = { activeChat.id === chat.id } onClick = { ()=>{ this.props.setActiveChat(chat)}} />
								)
							})
							:
								differenceBy(users, [user], 'name').map((user)=>{
								return <SideBarOption 
									key = { user.id }
									name = { user.name }
									onClick = { ()=>{ this.addChatForUser(user.name) }  }
								/>
							})
							}
						</div>
							
					<div className="current-user">
						<span>{user.name}</span>
						<div onClick={()=>{logout()}} title="Logout" className="logout">
							<MdEject/>	
						</div>
					</div>
			</div>
		);
	
	}
}