const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Guns']
  try {
    const vehicles = await mongodb
      .getDatabase()
      .db()
      .collection("guns")
      .find()
      .toArray();

    res.status(200).json(guns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Guns']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json("Must use a valid gun id to find gun.");
    }

    const gunId = new ObjectId(req.params.id);

    const gun = await mongodb
      .getDatabase()
      .db()
      .collection("guns")
      .findOne({ _id: gunId });

    res.status(200).json(gun);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createGun = async (req, res) => {
  //#swagger.tags=['Guns']
  try {
    const gun = {
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      category: req.body.category,
      caliber: req.body.caliber,
      finish: req.body.finish,
      price: req.body.price,
      status: req.body.status,
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("guns")
      .insertOne(gun);
    if (response.acknowledged) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(response.error || "Some error occurred while updating the gun.");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateGun = async (req, res) => {
  //#swagger.tags=['Guns']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json("Must use a valid gun id to find gun.");
    }
    const gunId = new ObjectId(req.params.id);
    const gun = {
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      category: req.body.category,
      caliber: req.body.caliber,
      finish: req.body.finish,
      price: req.body.price,
      status: req.body.status,
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("guns")
      .replaceOne({ _id: gunId }, gun);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(response.error || "Some error occurred while updating the gun.");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteGun = async (req, res) => {
  //#swagger.tags=['Guns']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json("Must use a valid gun id to find gun.");
    }
    const gunId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("guns")
      .deleteOne({ _id: gunId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(response.error || "Some error occurred while deleting the gun.");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createGun,
  updateGun,
  deleteGun,
};
