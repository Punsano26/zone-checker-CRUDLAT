const Store = require("../models/store.model");

//create and Save a new Store
exports.create = async (req, res) => {
  const { storeName, adminId, address, lat, lng, deliveryRadius } = req.body;
  console.log(req.body);

  //validate data
  if ((!storeName || !adminId || !address || !lat || !lng || !deliveryRadius)) {
    res.status(400).send({
      message:
        " storeName, adminId, address, lat, lng, deliveryRadius required!",
    });
  }
  await Store.findOne({ where: { storeName: req.body.storeName } }).then(
    (store) => {
      if (store) {
        res.status(400).send({ message: "Store already exists" });
        return;
      }
      //create a new book
      const newStore = {
        storeName,
        adminId,
        address,
        lat,
        lng,
        deliveryRadius,
      };
      Store.create(newStore)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Something error occurred while creating the Store.",
          });
        });
    }
  );
};

//Get all Store
exports.getAll = async (req, res) => {
  await Store.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Somthing error occurred while retrieving Store.",
      });
    });
};

//Get By ID
exports.getById = async (req, res) => {
  const id = req.params.id;
  await Store.findByPk(id)
    .then((data) => {
      if (!data) {
        res.status(400).send({ message: "No found Store with id =" + id });
      } else {
        res.send(data);
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Somthing error occurred while retrieving Store.",
      });
    });
};

//Update a Store
exports.update = async (req, res) => {
  const id = req.params.id;
  await Store.update(req.body, { where: { storeID: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Store was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Store with id=${id}. Maybe Store was not found or req.body is empty!`,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Somthing error occurred while updating Store.",
      });
    });
};

//Delete a Store
exports.deleteById = async (req, res) => {
  const id = req.params.id;
  await Store.destroy({ where: { storeID: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Store was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Store with id=${id}. Maybe Store was not found!`,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Somthing error occurred while deleting Store.",
      });
    });
};
