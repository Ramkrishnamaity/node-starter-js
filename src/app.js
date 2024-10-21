import express from 'express'
import path from "path"
import cors from 'cors'
import logger from "morgan"
import { fileURLToPath } from 'url';
import RootApiRouter from './routes/index.js'
import { connectDB } from './lib/config/Database.js'

const PORT = process.env.PORT || 4080
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "../public")))
app.use(logger("dev"))
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
)


connectDB()


app.use('/api/v1', RootApiRouter)


app.listen(PORT, () => {
	console.log(`App is running at port ${PORT}`)
})