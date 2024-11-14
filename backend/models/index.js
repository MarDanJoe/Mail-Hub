const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mailhub', 'Danny', 'Danny', {
  host: 'localhost',
  dialect: 'postgres',
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Email = require('./email')(sequelize, Sequelize);

db.User.hasMany(db.Email, { foreignKey: 'userId' });
db.Email.belongsTo(db.User, { foreignKey: 'userId' });

module.exports = db;
