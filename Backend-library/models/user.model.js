const {DataTypes} = require("sequelize");
const sequelize = require("./db");
//define DB Schema
const User = sequelize.define("user", {
  //ถ้าเกิดเราไม่ได้กำหนด primary key มันจะทำให้ id เป็นค่า defult ของ sequelize

  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lat: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  lng: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
});

module.exports = User;