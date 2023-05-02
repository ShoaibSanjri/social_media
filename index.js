const express = require("express");
const { connection } = require("./db");
require("dotenv").config()
const app = express()

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