'use strict';
const coffeeModel = (sequelize, DataTypes) => 
sequelize.define('coffee', {
    name: {
        type: DataTypes.STRING,
        required: true,
        unique: true
    },
    weight: {
        type: DataTypes.STRING,
        required: true
    },
    price: {
        type: DataTypes.STRING,
        required: true
    },
    type: {
        type: DataTypes.STRING,
        required: true

    }
    
});

module.exports = coffeeModel;



