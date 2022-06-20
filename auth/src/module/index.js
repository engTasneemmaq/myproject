'use strict';
require('dotenv').config();
const coffeeModel = require('./coffeeModel');
const Collection = require('./collection');
const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('./Users');


const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

let sequelizeOptions =
process.env.NODE_ENV === "production"
     ? {
         dialectOptions: {
            ssl: { require: true, rejectUnauthorized: false}
         },
     }
     : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);
const coffeeTable = coffeeModel(sequelize, DataTypes);
const userTable = UserModel(sequelize, DataTypes);

// console.log(userTable);

const coffeeCollection = new Collection(coffeeTable);

module.exports = {
    db: sequelize,
    coffee:coffeeCollection,
    Users: userTable,
};
