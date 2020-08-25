const sql = require('mssql');
const Sequelize = require('sequelize');
const { sqlconfig, env } = require('./vars');
const logger = require('./logger');

const sequelize = new Sequelize(sqlconfig.database, sqlconfig.user, sqlconfig.password, {
  host: sqlconfig.server,
  port: sqlconfig.port,
  dialect: 'mssql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('../api/models/user.model')(sequelize, Sequelize);
db.offices = require('../api/models/office.model')(sequelize, Sequelize);
db.passwordResetTokens = require('../api/models/passwordResetToken.model')(sequelize, Sequelize);
db.refreshTokens = require('../api/models/refreshToken.model')(sequelize, Sequelize);

/* db.tutorials = require('../api/models/tutorial.model')(sequelize, Sequelize);
db.comments = require('../api/models/comment.model')(sequelize, Sequelize);

db.tutorials.hasMany(db.comments, { as: 'comments' });
db.comments.belongsTo(db.tutorials, {
  foreignKey: 'tutorialId',
  as: 'tutorial',
}); */

module.exports = db;
