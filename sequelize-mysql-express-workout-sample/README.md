## Initialize Node
npm init

## Install Mysql, Sequelize and Express
npm install mysql2 sequelize express
npm install body-parser cors

## Include a Server.js file with basic info

## Intialize sequelize
sequelize init

## Initializing Sequelize will include models, migrations, config and seeders folders

## Edit config file MYSQL connection part on development
"development": {
    "username": "root",
    "password": "Varsini123!",
    "database": "sequelizedb",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }

## In case of adding config file without initializing sequelize, then can add the following code in config.js inside config/ folder
module.exports = {
HOST: "localhost",
USER: "root",
PASSWORD: "Varsini123!",
DB: "testdb",
dialect: "mysql",
pool: {
max: 5,
min: 0,
acquire: 30000,
idle: 10000
}
};

## Add the following db sync in server.js file 
const db = require("./models");
db.sequelize.sync();

## In case already a db exist and need to force resync again by drop and create, give force option as true
db.sequelize.sync({ force: true }).then(() => {
console.log("Drop and re-sync db.");
});

## Creating models
## To create model using sequelize-cli need to install it and run the following command with the required attributes
sequelize model:create --name MyUser --attributes first_name:string,colour:string

## To create model without using sequelize-cli, can create a models folder and include the file myuser.js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MyUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  MyUser.init({
    first_name: DataTypes.STRING,
    colour: DataTypes.STRINGT
  }, {
    sequelize,
    modelName: 'MyUser',
  });
  return MyUser;
};

## Also while creating model using sequelize-cli, migration is also automatically created under migrations folder. If not we can create one.
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MyUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING
      },
      colour: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('MyUsers');
  }
};

## In case we are having our code ready for migrations, then can create it.
sequelize migration:generate --name myusers

## Include routes for CURD process

## Test the POST Request
http://localhost:8080/api/new
Parameters
first_name: varsinis
colour: green

## Test the Get Request
http://localhost:8080/api/all
http://localhost:8080/api/1

## Test the DELETE Request
http://localhost:8080/api/delete/1

## Test the PUT Request
http://localhost:8080/api/edit
Parameters
first_name: varsini
replace_name: varsinis