//express does not come with node
//so we had to installed it with npm
//we also ran npm init
//npm install -s express to save express as one of the
//dependencies in package.json which serves as the package management file
//for other users
//
var express = require('express')
var bodyParser = require('body-parser')
var app = express()

//using socket.io to let clients send messages 
//back to servers
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')

//listen on port 3000 
//to server index.html by listening on port 80, you need sudo
//because any port below 1024 requires root priviledge
//
app.use(express.static(__dirname))

//this lets the parser know that we will be sending in http request in json format
//
app.use(bodyParser.json())

//very needed to not get undefined error
//
app.use(bodyParser.urlencoded({extended: false}))

//this will let Mongoose to know that the Promise library (for call backs)
//that it wants to use is the default ES6 Promise
mongoose.Promise = Promise

//in a production environment, make sure the user:user is the username and password
//that is in a configuration file 
//
var dbUrl = "mongodb://user:THduong288!@ds219055.mlab.com:19055/learning-node"

//creating a model
//defines the schema for the Mongo DB 
var Message = mongoose.model('Message', {
	name: String,
	message: String
})

//getMessage service endpoint to send msg from backend to front end
//we use app.get to specify that we will be handling GET requests
//the first parameter is the route
//we can navigate to the website with \messages end point
app.get('/messages', (req,res) =>{
	//saved in Mongo DB
	//
	Message.find({}, (err, messages) =>{
		res.send(messages)
	})
})

app.get('/messages/:user', (req,res) =>{
        var user = req.params.user
	//saved in Mongo DB                                                    
        //                                                                     
        Message.find({name: user}, (err, messages) =>{
                res.send(messages)
        })
})

//for posting messages from a client
//200 to let the client that everything went well
app.post('/messages', async (req, res) =>{
	
	try {

	//throw 'some error'
	
	//creating a message with schema defined 
	//above
	//
	var message = new Message(req.body)
        var savedMessage = await message.save()
        console.log('saved')

        var censored = await Message.findOne({message: "badword"})


        if(censored)
                await Message.remove({_id: censored.id})
        else
                //if there is no error, i.e successfully saved to DB    
                //emit a socket IO event and send status of                                      
                //200                                                                                		 //
	    io.emit('message', req.body)
        res.sendStatus(200)
	    
	}catch (error){
	    res.sendStatus(500)                                                                  
            return console.error(error)
	}finally{
		//finally runs no matter what, this is usally to submit things to a log
		//
		//logger.log('message post called')
		//open, post something and close a db
		console.log('message post called')
	}

})

//this is a callback for when a new user connects 
io.on('connection', (socket) => {
    console.log('a user is connected')
})

mongoose.connect(dbUrl,{useNewUrlParser: true}, (err)=>{
	console.log('mongo db connection', err)
})

//replaced app with http
//to work with socket.io
var server = http.listen(3000, () => {
	console.log("server is listening on port", server.address().port)
})
