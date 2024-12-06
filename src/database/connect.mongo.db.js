const mongoose = require('mongoose')
const logger = require('../middleware/winston.logger')

const connectionString = process.env.MONGO_URI
mongoose.set('strictQuery', false)

const connectDatabase = async () => {
	try {
		await mongoose
			.connect(connectionString)
			.then(() => {
				logger.info('Connection establish to MongoDB database successful!')
			})
			.catch(error => {
				logger.error('Error connecting to MongoDB: ', error)
			})
		mongoose.set('debug', true)
		// disable colors in debug mode
		mongoose.set('debug', { color: false })

		// get mongodb-shell friendly output (ISODate)
		mongoose.set('debug', { shell: true })
	} catch (error) {
		logger.error('Database connection error: ', error)
	}
}

module.exports = connectDatabase
