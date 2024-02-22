const prisma = require('../db');

const getUsers = async (req, res) => {
  const users = await prisma.users.findMany();

  return res.status(200).send(users);
}

const createUser = async (req, res) => {
  try {
    const data = req.body;
  
    const user = await prisma.users.create({ data });
  
    return res.status(200).json(user);
  } catch(error) {
    console.error("Error [createUser]: ", error);
    return res.status(400).json({ error: "Internal server error" });
  }
};

const asignRolToUserById = async (req, res) => {
  try {
    const userId = req.params?.id;
    const rol_id = req.body?.rol_id;

    if (!rol_id) {
      return res.status(400).json({ error: "Rol field is empty" });
    }

    const user = await prisma.users.update({
      where: { id: +userId },
      data: { rol_id },
      include: { rol: true }
    })

    console.log("userId: ", user);

    return res.status(200).json(user);
  } catch(error) {
    console.error("Error [asignRolToUserById]: ", error);
    return res.status(400).json({ error: "Internal server error" });
  }
}

module.exports = {
  getUsers,
  createUser,
  asignRolToUserById,
}