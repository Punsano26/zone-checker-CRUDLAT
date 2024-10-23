const User = require("../models/user.model");
const Store = require("../models/store.model");

// Middleware ตรวจสอบสิทธิ์ Admin ของร้าน
const checkStoreAdmin = async (req, res, next) => {
  try {
    // ตรวจสอบว่าผู้ใช้มี ID หรือไม่
    if (!req.userId) {
      return res.status(403).send({ message: "User not authenticated!" });
    }

    // ตรวจสอบว่าผู้ใช้มีอยู่ในระบบหรือไม่
    const user = await User.findOne({ where: { id: req.userId } });
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    // ตรวจสอบว่าร้านเป็นของ Admin นี้หรือไม่
    const store = await Store.findOne({ where: { storeID: req.params.id, adminId: user.id } });
    if (!store) {
      return res.status(403).send({ message: "Access Denied! You can only manage your own store." });
    }

    next(); // ผ่านเงื่อนไข
  } catch (error) {
    console.error("Error in checkStoreAdmin middleware:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// Export middleware
module.exports = { checkStoreAdmin };
