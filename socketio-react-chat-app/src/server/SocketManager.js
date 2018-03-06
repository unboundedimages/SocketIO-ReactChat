const io = require('./index.js').io

const { VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED, 
		LOGOUT, COMMUNITY_CHAT, MESSAGE_RECIEVED, MESSAGE_SENT,
		TYPING } = require('../Events')

const { createUser, createMessage, createChat } = require('../Factories')

let connectedUsers = {  }

let communityChat = createChat()

module.exports = function(socket){
	console.log("Socket Id: " + socket.id);

	let sendMessageToChatFromUser;

	let sendTypingFromUser;

	
	socket.on(VERIFY_USER, (nickname, callback)=>{
		if(isUser(connectedUsers, nickname)){
			callback({ isUser:true, user:null })
		}else{
			callback({isUser:false, user:createUser({name:nickname})})
		}
	})

	socket.on(USER_CONNECTED, (user)=>{
		connectedUsers = addUser(connectedUsers, user)
		socket.user = user

		sendMessageToChatFromUser = sendMessageToChat(user.name)
		sendTypingFromUser = sendTypingToChat(user.name)

		socket.emit(USER_CONNECTED, connectedUsers)
		console.log(connectedUsers);	
	})

	socket.on(COMMUNITY_CHAT, (callback)=>{
		callback(communityChat)
	})

}


function addUser(userList, user){
	let newList = Object.assign({}, userList)
		newList[user.name] = user
		return newList
}


function removeUser(userList, username){
	let newList = Object.assingn({}, userList)
	delete newList[username]
	return newList
}


function isUser(userList, username){
	return username in userList
}