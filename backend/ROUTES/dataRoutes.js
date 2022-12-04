const express = require("express");

const router = express.Router();

const getalldata = require("../CONTROLLERS/dataControllers").getAllData;
const adddata = require("../CONTROLLERS/dataControllers").addData;
const updatedata = require("../CONTROLLERS/dataControllers").updateData;
const deletedata = require("../CONTROLLERS/dataControllers").deleteData;

router.get("/", getalldata);
router.post("/post", adddata);
router.patch("/:id/edit", updatedata);
router.delete("/:id/delete", deletedata);

module.exports = router;
