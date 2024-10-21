const express = require("express");
const router = express.Router();
const libraryController = require("../controllers/library.controller");

const { authJwt } = require("../middlewares");

//create a library
//POST http://localhost:3000/api/v1/libraries
router.post(
    "/",[authJwt.verifyToken, authJwt.isAdminOrMod],
    libraryController.create
);

//get all library
//GET http://localhost:3000/api/v1/libraries
router.get("/", libraryController.getAll);

//get by id
//GET http://localhost:3000/api/v1/libraries/:id
router.get("/:id", [authJwt.verifyToken] ,libraryController.getById);

//Update restaurant Router
router.put(
    "/:id",
    [authJwt.verifyToken, authJwt.isAdminOrMod],
    libraryController.update
);

//delete library Router
router.delete(
    "/:id",
    [authJwt.verifyToken, authJwt.isAdminOrMod],
    libraryController.deleteById
);
module.exports = router;