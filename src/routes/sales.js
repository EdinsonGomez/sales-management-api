const salesManager = require("../managers/salesManager");
const { validatePermission } = require("../middlewares/validatePermision");
const express = require("express");

const router = express.Router();

router.get("/", validatePermission(["all"]), salesManager.getSales);
router.post("/create", validatePermission(["all"]), salesManager.createSales);

module.exports = router;