import React from 'react';

export default function({name}) {
	
		return (
			<div className="chat-header"></div>
				<div className="user-info">
					<div className="user-name"></div>
					<div className="status">
						<div className="indicator"></div>
						<span>{numberOfUsers ? numberOfUsers : null}</span>
					</div>
				</div>
			);
	
}