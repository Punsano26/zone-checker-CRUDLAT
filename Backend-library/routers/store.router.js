const express = require("express");
const router = express.Router();
const storeController = require("../controllers/store.controller");

const { authJwt } = require("../middlewares");

//create a stores
//POST http://localhost:3000/api/v1/stores
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

//Update store Router
router.put(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdminOrMod],
  storeController.update
);

//delete store Router
router.delete(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdminOrMod],
  storeController.deleteById
);
module.exports = router;