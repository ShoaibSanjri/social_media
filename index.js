const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.router");
const { auth } = require("./middleware/user.auth");
const { postRouter } = require("./routes/post.router");
require("dotenv").config()
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors())


app.use('/users', userRouter)

app.use(auth)

app.use('/posts', postRouter)

app.get("/", (req, res) => {
    res.send("Homepage")
})
app.listen(process.env.Port, async () => {
    try {
        await connection;
        console.log("Connected to server")
    } catch (err) {
        console.log("err",err)
    }
    console.log(`server running on ${process.env.Port} `)
})