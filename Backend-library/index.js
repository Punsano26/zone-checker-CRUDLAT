const express = require("express");
const app = express();
require("dotenv").config(".env");
const PORT = process.env.PORT || 2000;
const libraryRouter = require("./routers/library.router");
const authRouter = require("./routers/auth.router");
const db = require("./models/index");
const role = db.Role
const cors = require("cors");
const FUrl = process.env.FRONTEND_URL;

const corsOption = {
    origin: FUrl,
  };

//   db.sequelize.sync({ force: true }).then(() => {
//   initRole();
//   console.log("Drop and re-sync db.");
// });

  const initRole = () => {
    role.create({
      id: 1,
      name: "user",
    });
    role.create({
      id: 2,
      name: "moderator",
    });
    role.create({
      id: 3,
      name: "admin",
    });
  };

//use middleware
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

  //use Router
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/libraries", libraryRouter);


  app.get("/", (req, res) => {
    res.send("<h1>Hello Librarys API</h1>");
  });

  app.listen(PORT, () => {
    console.log("Listenning to http://localhost:" + PORT);
  });