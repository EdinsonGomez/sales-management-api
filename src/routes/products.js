const productsManager = require("../managers/productsManager");
const { validatePermission } = require("../middlewares/validatePermision");
const express = require("express");

const router = express.Router();

router.get("/", validatePermission(["all"]), productsManager.getProducts);

module.exports = router;