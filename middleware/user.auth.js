const express = require("express");
const jwt = require("jsonwebtoken")
const auth = (req, res, next) => {
    let token = req.headers.authorization;
    // console.log(token)
    try {
        let decoded = jwt.verify(token.split(" ")[1], 'masai');
        if (decoded) {
            // console.log(decoded)
            req.body.authorID = decoded.authorID;
            next()
        }
        else {
            res.send({"msg":"Please Login First"})
        }
    }
    catch (err) {
        res.send(err)
    }
    
}

module.exports = {
    auth
}