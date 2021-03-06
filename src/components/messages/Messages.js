import React, { Component } from 'react';

export default class Messages extends Component {
	constructor(props) {
	  super(props);
		
		this.scrollDown = this.scrollDown.bind(this)
	}

	scrollDown(){
		const { container } = this.refs
		container.scrollTop = container.scrollHeight
	}

	componentDidMount() {
		this.scrollDown()
	}

	componentDidUpdate(prevProps, prevState) {
		this.scrollDown()
	}
	
	render() {
		const { messages, user, typingUsers } = this.props
		return (
			<div ref='container'
				className="thread-container">
				<div className="thread">
					{
						messages.map((mes)=>{
							return (
								<div
									key={mes.id}
									className={`message-container ${mes.sender === user.name && 'right'}`}
								>
									<div className="name"></div>
									<div className="data">
										<div className="message">{mes.message}</div>
										
										<div className="time">{mes.sender}:{mes.time}</div>
									</div>
								</div>
                               //I switched the divs for "name"a and "time".  The css still needs adjustment
                               //to match this switch.
								)
						})
					}
					{
						typingUsers.map((name)=>{
							return (
								<div key={name} className="typing-user">
									{`${name} is typing . . .`}
								</div>
							)
						})
					}
				</div>


			</div>
		);
	}
}