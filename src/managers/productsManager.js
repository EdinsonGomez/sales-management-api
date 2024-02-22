const prisma = require("../db");

const getProducts = async (req, res) => {
  try {
    const products = await prisma.products.findMany();

    return res.status(200).json(products);
  } catch(error) {
    console.error("Error [asignRolToUserById]: ", error);
    return res.status(400).json({ error: "Internal server error" });
  }
}


module.exports = {
  getProducts
}