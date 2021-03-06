const Sequelize = require('sequelize');
const { sqlconfig, env } = require('./vars');

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
db.positions = require('../api/models/position.model')(sequelize, Sequelize);
db.offices = require('../api/models/office.model')(sequelize, Sequelize);
db.passwordResetTokens = require('../api/models/passwordResetToken.model')(sequelize, Sequelize);
db.refreshTokens = require('../api/models/refreshToken.model')(sequelize, Sequelize);

db.roles = require('../api/models/role.model')(sequelize, Sequelize);
db.permissions = require('../api/models/permission.model')(sequelize, Sequelize);
db.role_permission = require('../api/models/role_permission.model')(sequelize, Sequelize);
db.contacts = require('../api/models/contact.model')(sequelize, Sequelize);
db.chatGroups = require('../api/models/chatGroup.model')(sequelize, Sequelize);
db.user_chatGroup = require('../api/models/userChatGroup.model')(sequelize, Sequelize);
db.user_Group = require('../api/models/userGroup.model')(sequelize, Sequelize);
db.message = require('../api/models/message.model')(sequelize, Sequelize);
db.attachment = require('../api/models/attachment.model')(sequelize, Sequelize);

db.notification = require('../api/models/notification.model')(sequelize, Sequelize);
db.groups = require('../api/models/group.model')(sequelize, Sequelize);
db.post = require('../api/models/post.model')(sequelize, Sequelize);
db.comment = require('../api/models/comment.model')(sequelize, Sequelize);
db.reactions = require('../api/models/reaction.model')(sequelize, Sequelize);
db.note = require('../api/models/note.model')(sequelize, Sequelize);
db.datasync = require('../api/models/datasync.model')(sequelize, Sequelize);
db.anmsync = require('../api/models/ANMsync.model')(sequelize, Sequelize);
db.camerasync = require('../api/models/CAMERAsync.model')(sequelize, Sequelize);

const User = db.users;
const Position = db.positions;
const Office = db.offices;
const Role = db.roles;
const ChatGroup = db.chatGroups;
const Permission = db.permissions;
const UserChatGroup = db.user_chatGroup;
const UserGroup = db.user_Group;
const Message = db.message;
const Attachment = db.attachment;
const Notification = db.notification;
const Group = db.groups;
const Post = db.post;
const Comment = db.comment;
const Reaction = db.reactions;
const Note = db.note;
const Datasync = db.datasync;
const ANMsync = db.anmsync;
const CAMERAsync = db.camerasync;

Position.hasMany(User, { as: 'users' });
User.belongsTo(Position, {
  foreignKey: 'positionId',
  as: 'position',
});

Office.hasMany(Office, { as: 'offices' });
Office.belongsTo(Office, {
  foreignKey: 'parentId',
  as: 'office',
});

Office.hasMany(User, { as: 'users' });
User.belongsTo(Office, {
  foreignKey: 'officeId',
  as: 'office',
});

Office.hasMany(User, { as: 'nhoms' });
User.belongsTo(Office, {
  foreignKey: 'nhomId',
  as: 'nhom',
});

User.belongsToMany(Role, {
  through: 'user_role',
  as: 'roles',
  foreignKey: 'userId',
});

Role.belongsToMany(User, {
  through: 'user_role',
  as: 'users',
  foreignKey: 'roleId',
});

Permission.belongsToMany(Role, {
  through: 'role_permission',
  as: 'roles',
  foreignKey: 'permissionId',
});

Role.belongsToMany(Permission, {
  through: 'role_permission',
  as: 'permissions',
  foreignKey: 'roleId',
});

User.belongsToMany(ChatGroup, {
  through: 'user_chatGroup',
  as: 'chatGroups',
  foreignKey: 'userId',
});

ChatGroup.belongsToMany(User, {
  through: 'user_chatGroup',
  as: 'users',
  foreignKey: 'chatGroupId',
});

// User.hasMany(Message, { as: 'messages' });
Message.belongsTo(User, {
  foreignKey: 'senderId',
  as: 'sender',
});

Message.belongsTo(User, {
  foreignKey: 'receiverId',
  as: 'receiver',
});

ChatGroup.hasMany(Message, { as: 'messages' });
Message.belongsTo(ChatGroup, {
  foreignKey: 'chatGroupId',
  as: 'chatGroup',
});

Message.hasMany(Attachment, { as: 'attachments' });
Attachment.belongsTo(Message, {
  foreignKey: 'messageId',
  as: 'message',
});

User.hasMany(Attachment, { as: 'attachments' });
Attachment.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

User.hasMany(Reaction, { as: 'reactions' });
Reaction.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

Post.hasMany(Reaction, { as: 'reactions' });
Reaction.belongsTo(Post, {
  foreignKey: 'postId',
  as: 'post',
});

Comment.hasMany(Reaction, { as: 'reactions' });
Reaction.belongsTo(Comment, {
  foreignKey: 'commentId',
  as: 'comment',
});

Post.hasMany(Attachment, { as: 'attachments' });
Attachment.belongsTo(Post, {
  foreignKey: 'postId',
  as: 'post',
});

Comment.hasMany(Attachment, { as: 'attachments' });
Attachment.belongsTo(Comment, {
  foreignKey: 'commentId',
  as: 'comment',
});

User.belongsToMany(Group, {
  through: 'user_group',
  as: 'groups',
  foreignKey: 'userId',
});

Group.belongsToMany(User, {
  through: 'user_group',
  as: 'users',
  foreignKey: 'groupId',
});

User.belongsToMany(Group, {
  through: 'userAdmin_group',
  as: 'groupsAdmin',
  foreignKey: 'userId',
});

Group.belongsToMany(User, {
  through: 'userAdmin_group',
  as: 'usersAdmin',
  foreignKey: 'groupId',
});

User.hasMany(Post, { as: 'posts' });
Post.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

Group.hasMany(Post, { as: 'posts' });
Post.belongsTo(Group, {
  foreignKey: 'groupId',
  as: 'group',
});

Post.hasMany(Comment, { as: 'comments' });
Comment.belongsTo(Post, {
  foreignKey: 'postId',
  as: 'post',
});

Comment.hasMany(Comment, { as: 'comments' });
Comment.belongsTo(Comment, {
  foreignKey: 'parentId',
  as: 'comment',
});

User.hasMany(Comment, { as: 'comments' });
Comment.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

User.hasMany(Note, { as: 'notes' });
Note.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

module.exports = db;
