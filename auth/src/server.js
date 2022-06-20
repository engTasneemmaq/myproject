'use strict';
require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;


const notFoundHandler = require("./error-handlers/404");
const errorHandler = require("./error-handlers/500");

const signUpRouter=require("./routes/signUpRouter");
const signInRouter=require("./routes/signInRouter");
const secretRouter=require("./routes/secretRouter");
const router =require("./routes/routerApi");
const allUser = require("./routes/allUser");
const aclRouter =require("./routes/aclRouter");

app.use(express.json());
app.get("/",handleHome);
app.use(signUpRouter);
app.use(signInRouter);
app.use(secretRouter);
app.use(allUser);
app.use(router);
app.use(aclRouter);

function handleHome(req,res){
    res.send("Welcome to heroku auth-api-server coffee store")
}


app.use("*", notFoundHandler);
app.use(errorHandler); 

function start() {
    app.listen(PORT, () => {
        console.log(`Listen and Running on port ${PORT}`);
    });
}

module.exports = {
    app: app,
    start: start,
};