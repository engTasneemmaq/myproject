'use strict';

const express = require('express');
const dataModules = require('../module/index');
const bearer = require('../middlewares/bearer');
const acl = require('../middlewares/acl');

const router = express.Router();

// console.log("llllllllll");
router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});

router.get('/:model', bearer,acl('read'),handleGetAll);
router.get('/:model/:id', bearer, acl('read'), handleGetOne);
router.post('/:model', bearer, acl('create'), handleCreate);
router.put('/:model/:id', bearer, acl('update'), handleUpdate);
router.delete('/:model/:id', bearer, acl('delete'), handleDelete);

async function handleGetAll(req, res) {
  // console.log("hhh");
  let allRecords = await req.model.read();
  res.status(200).json(allRecords);
}

async function handleGetOne(req, res) {
  const id = req.params.id;
  let theRecord = await req.model.read(id)
  res.status(200).json(theRecord);
}


async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  if(newRecord){
    res.status(201).json(newRecord);
  }else{
    res.status(403).send("error createing record");
  }
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await req.model.update(id, obj)
  res.status(201).json(updatedRecord);
}

async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await req.model.delete(id);
  res.status(204).json(deletedRecord);
}


module.exports = router;