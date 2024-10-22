const sequelize = require("./db");
const Sequelize = require("sequelize");
const User = require("./user.model");
const Role = require("./role.model");
const Store = require("./store.model");


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Store = Store;
db.User = User;
db.Role = Role;
//Assosiation
db.User.belongsToMany(db.Role, { through: "user_role" }); //สร้างตารางตรงกลางชื่อ user_role
db.Role.belongsToMany(db.User, { through: "user_role" });

db.User.hasMany(db.Store, {
  foreignKey: "adminId",
});
db.Store.belongsTo(db.User, {
  foreignKey: "adminId",
});
module.exports = db