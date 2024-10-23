const express = require("express");
const router = express.Router();
const storeController = require("../controllers/store.controller");
const verifyStoreAdmin = require("../middlewares/veryfyStoreAdmin");
const { authJwt } = require("../middlewares");

//create a stores
//POST http://localhost:2000/api/v1/stores
router.post(
  "/",
  [authJwt.verifyToken, authJwt.isAdminOrMod],
  storeController.create
);

//get all store
//GET http://localhost:3000/api/v1/stores
router.get("/", storeController.getAll);

//get by id
//GET http://localhost:3000/api/v1/stores/:id
router.get("/:id", [authJwt.verifyToken], storeController.getById);

// แก้ไขร้าน (เฉพาะ Admin ของร้านเท่านั้น)
router.put(
  "/:id",
  [authJwt.verifyToken, verifyStoreAdmin.checkStoreAdmin], // ตรวจสอบสิทธิ์ Admin
  storeController.update
);

// ลบร้าน (เฉพาะ Admin ของร้านเท่านั้น)
router.delete(
  "/:id",
  [authJwt.verifyToken, verifyStoreAdmin.checkStoreAdmin], // ตรวจสอบสิทธิ์ Admin
  storeController.deleteById
);
module.exports = router;