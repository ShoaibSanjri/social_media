const express = require("express");
const { PostModel } = require("../models/post.model");

const postRouter = express.Router();

postRouter.get('/', (req, res) => {
    
})

postRouter.post('/create', async (req, res) => {
    console.log(req.body)
    try {
        let post = new PostModel(req.body);
        await post.save();
        res.status(200).send({"msg":"New Post is added"})
    }
    catch (err) {
        res.status(400).send(err)
    }
})

module.exports = {
    postRouter
}