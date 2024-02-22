const productsManager = require("../managers/productsManager");
const { validatePermission } = require("../middlewares/validatePermision");
const express = require("express");

const router = express.Router();

router.get("/", validatePermission(["all"]), productsManager.getProducts);
router.post("/create", validatePermission(["admin"]), productsManager.createProduct);

module.exports = router;