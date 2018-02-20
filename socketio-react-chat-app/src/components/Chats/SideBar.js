import React, { Component } from 'react';

export default class SideBar extends Component {
	render() {
		const { chats, activeChats, user, setActiveChat, logout } = this.props
		return (
			<div id="side-bar">
					<div className="heading">
						<div className="app-name">One Chill Chat <FAChevronDown /></div>
						<div className="menu">
							<FAMenu />
						</div>	
					</div>
			</div>
			);
	}
}