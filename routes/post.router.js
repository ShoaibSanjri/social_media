const express = require("express");
const { PostModel } = require("../models/post.model");

const postRouter = express.Router();



postRouter.post('/create', async (req, res) => {
    // console.log(req.body)
    try {
        let post = new PostModel(req.body);
        await post.save();
        res.status(200).send({"msg":"New Post is added","post":post})
    }
    catch (err) {
        res.status(400).send(err)
    }
})
postRouter.get('/', async (req, res) => {
    // console.log(req.body)
    // let token = req.headers.authorization;
    let { authorID } = req.query;
    console.log(req.query.device)
    if (req.query.device) {
        
            try {
        
                let post = await PostModel.find({ device: req.query.device });
                res.status(200).send({"msg":post})
            
            
            }
            catch (err) {
                res.status(400).send(err)
            }
        }

    else {
        try {
        
            let post = await PostModel.find({authorID:authorID});
            res.status(200).send({"msg":post})
        
        
    }
    catch (err) {
        res.status(400).send(err)
    }
    }
    
})

postRouter.patch("/update/:id", async (req, res) => {
    let { id } = req.params;
    try {
        await PostModel.findByIdAndUpdate(id, req.body);
        res.status(200).send({"msg":"Post Updated"})
    }
    catch (err) {
        res.send(err)
    }
})
postRouter.delete("/update/:id", async (req, res) => {
    let { id } = req.params;
    try {
        await PostModel.findByIdAndDelete(id);
        res.status(200).send({"msg":"Post Deleted"})
    }
    catch (err) {
        res.send(err)
    }
})
module.exports = {
    postRouter
}