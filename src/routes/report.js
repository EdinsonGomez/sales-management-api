const reportManager = require("../managers/reportManager");
const { validatePermission } = require("../middlewares/validatePermision");
const express = require("express");

const router = express.Router();

router.get("/", validatePermission(["admin"]), reportManager.getReportSalesByDate);

module.exports = router;