
const { Sequelize } = require('sequelize');


const eventDB = new Sequelize('events_db', 'root', '#jack538', {
  host: 'localhost',
  dialect: 'mariadb'
});


module.exports = eventDB;