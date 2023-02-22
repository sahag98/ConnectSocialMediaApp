const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")
const cors = require("cors");
const userRoute = require('./routes/users.js')
const authRoute = require('./routes/auth.js')
const postRoute = require('./routes/posts.js')
const ServerlessHttp = require('serverless-http')

dotenv.config()

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
  console.log("Connected to MongoDB")
})

//middleware
app.use(express.json())
app.use(cors());
app.use(helmet())
app.use(morgan("common"))

app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)

app.get("/", (req, res) => {
  res.status(200).json("working!!")
})

app.listen(8800, () => {
  console.log("Backend is running")
})

module.exports.handler = ServerlessHttp(app)