const messageModel = require('./public/js/models/message')
const nedb = require('nedb')
class Database {
	constructor(filename) {
		this.filename = filename
		this.db = new nedb({ filename: this.filename })
	}

	loadDatabase() {
		this.db.loadDatabase(err => {
			if (err != undefined) {
				throw new Error(err)
			}
		})
	}
	readAllMessages() {
		try {
			return this.db.getAllData()
		} catch (err) {
			throw new Error('Cannot fetch data from database')
		}
	}
	addMessage(nickname, message) {
		if (message === '' && nickname === '') {
			throw new Error('Fields cannot be empty')
		} else {
			let newMessage = new messageModel(nickname, message)
			try {
				this.db.insert(JSON.stringify(newMessage))
			} catch (err) {
				throw new Error('Cannot insert data to database')
			}
		}
	}
}
module.exports = Database
