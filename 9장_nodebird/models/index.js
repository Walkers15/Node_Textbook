const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(
    config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('./user')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.Hashtag = require('./hashtag')(sequelize,Sequelize);

db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);
db.Post.belongsToMany(db.Hashtag, { through: 'PostHashTag' });
db.Hashtag.belongsToMany(db.Post, { through: 'PostHashTag' });
db.User.belongsToMany(db.User, {
  foreignKey: 'followingId',
  as: 'Followers',
  through: 'Follow',
});
db.User.belongsToMany(db.User, {
  foreignKey: 'followerId',
  as: 'Followings',
  through: 'Follow',
});

module.exports = db;