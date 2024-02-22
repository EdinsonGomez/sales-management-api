const express = require("express");
const { validatePermission } = require("../middlewares/validatePermision");
const usersManager = require("../managers/usersManager");

const router = express.Router();

router.get('/', validatePermission(["admin"]), usersManager.getUsers);
router.post('/create', validatePermission(["admin"]), usersManager.createUser);
router.put('/:id/rol', validatePermission(["admin"]), usersManager.asignRolToUserById);
router.delete('/:id', validatePermission(["admin"]), usersManager.deleteUser);

module.exports = router;