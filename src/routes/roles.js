const rolesManager = require("../managers/rolesManager");
const { validatePermission } = require("../middlewares/validatePermision");
const express = require("express");

const router = express.Router();

router.get('/', validatePermission(["admin"]), rolesManager.getRoles);
router.post('/create', validatePermission(["admin"]), rolesManager.createRol);

module.exports = router;