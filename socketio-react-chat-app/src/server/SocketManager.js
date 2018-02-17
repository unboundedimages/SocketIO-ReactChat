const io = require('./index.js')

const { VERIFY_USER, USER_CONNECTED, LOGOUT } = require('../Events')

const { createUser, createMessage, createChat } = require('../Factories')

const connectedUsers = {  }

module.exports = function(socket){
	console.log("Socket Id: " + socket.id);

	socket.on(VERIFY_USER. (nickname, callback)=>{
		if(isUser){
			callback({ isUser:true, user:null })
		}else{
			callback({isUser:false, user:createUser()})
		}


	})



}


function addUser(userList, user){

}


function removeUser(userList, username){

}


function isUser(userList, username){

}