const salesManager = require("../managers/salesManager");
const { validatePermission } = require("../middlewares/validatePermision");
const express = require("express");

const router = express.Router();

router.get("/", validatePermission(["all"]), salesManager.getSales);
router.post("/create", validatePermission(["all"]), salesManager.createSales);
router.put("/:id", validatePermission(["admin"]), salesManager.updateSales);

module.exports = router;