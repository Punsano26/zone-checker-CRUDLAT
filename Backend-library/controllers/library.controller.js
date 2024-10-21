const Library = require("../models/store.model");

//create and Save a new Library
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
  await Library.findOne({ where: { storeName: req.body.storeName } }).then(
    (library) => {
      if (library) {
        res.status(400).send({ message: "Library already exists" });
        return;
      }
      //create a new book
      const newBook = {
        storeName,
        adminId,
        address,
        lat,
        lng,
        deliveryRadius,
      };
      Library.create(newBook)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Something error occurred while creating the Library.",
          });
        });
    }
  );
};

//Get all Library
exports.getAll = async (req, res) => {
  await Library.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Somthing error occurred while retrieving Library.",
      });
    });
};

//Get By ID
exports.getById = async (req, res) => {
  const id = req.params.id;
  await Library.findByPk(id)
    .then((data) => {
      if (!data) {
        res.status(400).send({ message: "No found Library with id =" + id });
      } else {
        res.send(data);
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Somthing error occurred while retrieving Library.",
      });
    });
};

//Update a Library
exports.update = async (req, res) => {
  const id = req.params.id;
  await Library.update(req.body, { where: { bookID: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Library was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Library with id=${id}. Maybe Library was not found or req.body is empty!`,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Somthing error occurred while updating Library.",
      });
    });
};

//Delete a Library
exports.deleteById = async (req, res) => {
  const id = req.params.id;
  await Library.destroy({ where: { bookID: id } }).then((num) => {
    if (num == 1) {
      res.send({
        message: "Library was deleted successfully!",
      });
    } else {
      res.send({
        message: `Cannot delete Library with id=${id}. Maybe Library was not found!`,
      });
    }
  }).catch((error) => {
    res.status(500).send({
      message:
        error.message || "Somthing error occurred while deleting Library.",
    });
  });
};
