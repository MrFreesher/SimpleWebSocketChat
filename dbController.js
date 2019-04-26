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
	addMessage(newMessage) {
		if (newMessage.message === '' && newMessage.nickname === '') {
			throw new Error('Fields cannot be empty')
		} else {
			try {
				this.db.insert(JSON.stringify(newMessage))
			} catch (err) {
				throw new Error('Cannot insert data to database')
			}
		}
	}
}
module.exports = Database
