const prisma = require("../db");

const validatePermission = (allowedRoles = []) => async (req, res, next) => {
  const auth = req.headers["auth"];
  
  if (!auth) {
    return res.status(400).json({ error: "Unaithorized" });
  }

  
  const user = await prisma.users.findUnique({
    where: { id: +auth },
    include: { rol: true },
  });
  
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  
  if (allowedRoles.includes("all")) return next();

  if (!allowedRoles.includes(user?.rol?.name)) {
    return res.status(400).json({ error: "Unaithorized" });
  }
  
  return next();
};

module.exports = { validatePermission };
