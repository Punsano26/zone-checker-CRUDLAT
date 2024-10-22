const { DataTypes } = require("sequelize");
const sequelize = require("./db");
//define DB Schema
const Role = sequelize.define("role", {
  id: { //ถ้าเกิดเราไม่ได้กำหนด primary key มันจะทำให้ id เป็นค่า defult ของ sequelize
    type: DataTypes.INTEGER, // ชนิดตัวเลข
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING, // ชนิดตัวอักษร 
    allowNull: false,
  },
});

module.exports = Role;