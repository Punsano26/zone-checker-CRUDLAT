const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.User;

//verify token
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  //1st verify
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }console.log(decoded.id+"hello");
    req.userId = decoded.id;
    
    next();
  });
};
//isAdmin?
isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res
        .status(401)
        .send({ message: "Unauthorized access, Require Admin Role!" });
    });
  });
};
//isMod?
IsMod = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res
        .status(401)
        .send({ message: "Unauthorized access, Require Moderator Role!" });
    });
  });
};
//IsAdminOrMod?
isAdminOrMod = (req, res, next) => {
 console.log(req.userId+"Punsan");
  User.findByPk(req.userId).then((user) => {
    
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator" || 
          roles[i].name === "admin"
        ) {
          next();
          return;
        }
      }
      res
        .status(401)
        .send({
          message: "Unauthorized access, Require Moderator or Admin Role!",
        });
    });
  });
};
const authJwt = {
  verifyToken,    // ตรวจสอบความถูกต้องของโทเค็น
  isAdmin,        // ตรวจสอบว่าผู้ใช้เป็น admin หรือไม่
  IsMod,          // ตรวจสอบว่าผู้ใช้เป็น moderator หรือไม่
  isAdminOrMod,   // ตรวจสอบว่าผู้ใช้เป็น admin หรือ moderator หรือไม่
};
module.exports = authJwt; // ส่งออกวัตถุ authJwt ให้สามารถนำไปใช้ในไฟล์อื่นๆ ได้