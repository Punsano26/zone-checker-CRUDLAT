const { DataTypes, DataType } = require("sequelize");
const sequelize = require("./db");

const Store = sequelize.define("store", {
  storeID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  adminId: {
    type: DataTypes.INTEGER,
    references: {
      model: "users",
      key: "id",
      allowNull: true,
    },
  },
  storeName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lat: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  lng: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  deliveryRadius: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
Store.sync({ force: false })
  .then(() => {
    console.log("Table Created or already exists");
  })
  .catch((err) => {
    console.log("Error creating table:", err);
  });
module.exports = Store;
