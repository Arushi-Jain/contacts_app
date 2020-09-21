
const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL 
  || "postgres://ymblqxfzxanslj:ef058a116772ae67dad190d4e661d19850e5206c3951c7c4e8c7e1a61f1c0422@ec2-54-159-112-44.compute-1.amazonaws.com:5432/d3c1bv9kpqcclt?ssl=true");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// models
const models=[
  require('./contacts.model'),
  require('./users.model'),
]

for (const model of models) {
	model(sequelize);
}

// db.Contacts = sequelize.import('../models/contacts.model')
// db.User = sequelize.import('../models/contacts.model')


module.exports = db;