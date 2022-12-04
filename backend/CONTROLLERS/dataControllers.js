const DATA = require("../MODELS/data");

const getAllData = async (req, res) => {
  let data;
  try {
    data = await DATA.find({});
  } catch (err) {
    res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }

  res
    .status(200)
    .json({ alldata: data.map((item) => item.toObject({ getters: true })) });
};

const addData = async (req, res) => {
  const title = req.body.title;

  const newData = new DATA({
    title: title,
  });

  let data;
  try {
    await newData.save();
  } catch {
    res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }

  res.status(201).json({ message: "SUCCSSFULLY ADDED NEW DATA" });
};

const updateData = async (req, res) => {
  const id = req.params.id;
  const title = req.body.title;

  let data, updatedData;
  try {
    data = await DATA.findById(id);
    data.title = title;
    await data.save();
  } catch {
    res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }

  res.status(201).json({ message: "SUCCESSFULLY UDATED DATA" });
};

const deleteData = async (req, res) => {
  const id = req.params.id;
  let data;
  try {
    data = await DATA.findById(id);
    await data.remove();
  } catch {
    res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }

  res.status(201).json({ message: "DELETE SUCCESSFUL" });
};

exports.getAllData = getAllData;
exports.addData = addData;
exports.updateData = updateData;
exports.deleteData = deleteData;
