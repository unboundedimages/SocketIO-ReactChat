import	React, { Component } from 'react';

export class LoginForm extends Component {
	render(){
		return(
			<div className="login">
				<form onSubmit={this.handleSubmit} className="login-form">

					<label htmlFor="nickname">

						<h2>Got a Nickname?</h2>

					</label>

					<input
						ref={(input)=>{ this.textInput = input }}
						type="text"
						id="nickname"
						value={nickname}
						onChage={this.handleChange}
						placeHolder={'Username'}
					/>

				</form>	

			</div>
		);
	}
}