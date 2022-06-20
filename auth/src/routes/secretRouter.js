'use strict';
const express = require('express');
const secretRouter=express.Router();
const bearer=require('../middlewares/bearer');

secretRouter.get('/secret',bearer,(req,res)=>{
    res.status(200).json({
        'message': 'You are authorized to view the users',
        'order': req.user
    });})

   
module.exports=secretRouter;