const prisma = require("../db");

const createRol = async (req, res) => {
  try {
    const data = req.body;

    const newRol = await prisma.roles.create({ data });

    return res.status(200).json(newRol);
  } catch(error) {
    console.error("Error [asignRolToUserById]: ", error);
    return res.status(400).json({ error: "Internal server error" });
  }
};

const getRoles = async (req, res) => {
  try {
    const roles = await prisma.roles.findMany();

    return res.status(200).json(roles);
  } catch(error) {
    console.error("Error [asignRolToUserById]: ", error);
    return res.status(400).json({ error: "Internal server error" });
  }
};

module.exports = {
  getRoles,
  createRol,
}