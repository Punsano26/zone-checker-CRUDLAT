const config = require("../config/auth.config");
const db = require("../models");
const User = db.User;
const Role = db.Role;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

//register a new user
exports.register = async (req, res) => {
    //save user to database
  const { username, email, password, address, lat, lng } = req.body;

  if (!username || !email || !password || !address || !lat || !lng) {
    res.status(400).send({ message: "ไปกรอกใหม่ไป!" });
    return;
  }

  //prepare user data
  const newUser = {
    username,
    email,
    password: bcrypt.hashSync(password, 11),
    address,
    lat,
    lng,
  };
  //Save user in the database
     await User.create(newUser)
    .then((user) => {
      if (req.body.roles) {
        console.log("Roles from request:", req.body.roles);  // Log roles
        Role.findAll({
          where: {
            name: { [Op.or]: req.body.roles },  
          },      
        }).then((roles) => {
          console.log("Roles found in DB:", roles);  // Log roles from D
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        //set defautl role to "user" id =1
        console.log("Setting default role to user.");
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch((err) => {
      console.error("Error finding roles:", err);  // Log any errors
      res.status(500).send({
        message:
          err.message ||
          "Somthing error occurred while registering the new User.",
      });
    });
};

//Login
exports.login = async (req, res) => {
    const { username, password } = req.body;
   
    if (!username || !password) {
      res.status(400).send({ message: "Please provide all required fields" });
      return;
    }
  
    //select * from users where username = "username";
    await User.findOne({ where: { username: username } })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: "User not found." });
        }
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Password! ผิด",
          });
        }
        // การออก token ให้กับ user
        const token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: "2 days",
        });
        //Select * From user_roles inner join users on user.id = user_role.userId inner join roles on user_roles.
        const authorities = [];
        user.getRoles().then((roles) => {
          for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
          }
          res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token,
          });
        });
      })
      .catch((err) => {
        res.status(500).send({ 
          message: 
          err.message || 
          "ไม่สามารถ Login ได้",
         });
      });
}