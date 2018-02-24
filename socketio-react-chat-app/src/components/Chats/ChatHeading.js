import React from 'react';
// import FA from 'react-icons/lib/fa/video-camera'
// import FA from 'react-icons/lib/fa/keyboard-control'

export default function({name, numberOfUsers}) {
	
	return (
		<div className="chat-header">
			<div className="user-info">
				<div className="user-name">{name}</div>
				<div className="status">
					<div className="indicator"></div>
					<span>{numberOfUsers ? numberOfUsers : null}</span>
				</div>
			</div>
		</div>	
	);
	
}