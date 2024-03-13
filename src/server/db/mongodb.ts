import mongoose from 'mongoose'

const connectMongoDB = async () => {
	try {
		if (!process.env.DATABASE_URL) {
			console.error('DATABASE_URL environment variable is not set')
			return
		}
		await mongoose.connect(process.env.DATABASE_URL)
		console.log('Connected to database')
	} catch (error) {
		console.error('Error connecting to database:', error)
	}
}

mongoose.connection.on('disconnected', () => {
	console.log('Disconnected from database. Attempting to reconnect...')
	connectMongoDB() // Attempt to reconnect
})

mongoose.connection.on('error', (error) => {
	console.error('Database connection error:', error)
})

mongoose.connection.on('connected', () => {
	console.log('Connected to database')
})

export default connectMongoDB
