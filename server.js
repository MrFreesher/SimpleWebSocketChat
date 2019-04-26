const express = require('express')

const app = express()
const WebSocket = require('ws')
const wsServer = new WebSocket.Server({ port: 8080 })
const path = require('path')
const port = 3000
const filename = 'data/messages.db'
const dbController = require('./dbController')
// Express action
app.use('/js', express.static('public/js'))
app.use('/css', express.static('public/css'))
//Routes
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
app.get('/chat', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'chat.html'))
})

//Database
const database = new dbController(filename)

//Websocket operations
wsServer.on('connection', ws => {
	ws.on('message', msg => {
		let m = JSON.parse(msg)

		let data = {
			nickname: m.nickname,
			message: m.message
		}
		database.addMessage(m.nickname, m.message)
		wsServer.clients.forEach(function each(client) {
			client.send(JSON.stringify([data]))
		})
	})
	let messages = database.readAllMessages()

	ws.send(JSON.stringify(messages))
})

//Running server
app.listen(port, () => console.log(`Server is running on port ${port}`))
