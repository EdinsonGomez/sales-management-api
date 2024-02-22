const express = require("express");
const { validatePermission } = require("../middlewares/validatePermision");
const usersManager = require("../managers/usersManager");

const router = express.Router();

router.get('/', validatePermission(["admin"]), usersManager.getUsers);
router.post('/create', validatePermission(["admin"]), usersManager.createUser);
router.patch('/:id/rol', validatePermission(["admin"]), usersManager.asignRolToUserById);

module.exports = router;