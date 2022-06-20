'use strict';
const express = require('express');
const allUser = express.Router();
const {Users}= require('../module/index');
const bearer = require('../middlewares/bearer');
const acl =require("../middlewares/acl");

allUser.get('/users', bearer ,acl('delete'),async(req,res,next)=>{
  
const userRecords = await Users.findAll({});  
const list = userRecords.map(user => user.username); 
res.status(200).json(list); 
   });

module.exports= allUser;
