const uuidv4 = require('uuid/v4')  //this allows unique id for each your
const createUser = ({name:""} = {})=>(
	{
		id:uuidv4(),
		name	
	}
)


const createMessage = ({message:"", sender:""} = {}=>(
		{
			id:uuidv4()
			time:new Date(Date.now()),
			message,
			sender
		}

	)

const getTime = (date)=>{
	return `${date.getHours()}:${("0"+date.getMinutes()).slice(-2)}`
}