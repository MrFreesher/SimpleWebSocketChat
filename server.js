const express = require('express')
const wsPort = 8080
const app = express()
const WebSocket = require('ws')
const wsServer = new WebSocket.Server({ port: wsPort })
const path = require('path')
const port = 3000
const filename = 'data/messages.db'
const dbController = require('./dbController')
const messageModel = require('./models/message')
// Express action
app.use('/js', express.static('public/js'))
app.use('/css', express.static('public/css'))
app.use('/assets', express.static('public/assets'))
//Routes
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
app.get('/chat', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'chat.html'))
})

//Database
const database = new dbController(filename)
try {
	database.loadDatabase()
} catch (err) {
	return
}
//Websocket operations
wsServer.on('connection', ws => {
	ws.on('message', msg => {
		let receivedMessage = JSON.parse(msg)

		let newMessage = new messageModel(
			receivedMessage.nickname,
			receivedMessage.message
		)

		database.addMessage(newMessage)
		wsServer.clients.forEach(function each(client) {
			client.send(JSON.stringify([newMessage]))
		})
	})
	let messages
	try {
		messages = database.readAllMessages()
	} catch (err) {
		console.log(err)
	}

	ws.send(JSON.stringify(messages))
})

//Running server
app.listen(port, () => console.log(`Server is running on port ${port}`))
