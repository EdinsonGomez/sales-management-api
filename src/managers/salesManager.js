const prisma = require('../db');
const { getSalesWithTotal } = require("../utils/salesUtils");

const getSales = async (req, res) => {
  try {
    const sales = await getSalesWithTotal();

    return res.status(200).json(sales);
  } catch(error) {
    console.error("Error [asignRolToUserById]: ", error);
    return res.status(400).json({ error: "Internal server error" });
  }
};

const createSales = async (req, res) => {
  try {
    const userId = req.headers?.auth;

    if (!userId) {
      return res.status(404).json({ error: "User not found" });
    }

    const data = {
      ...req.body,
      users_id: +userId,
      sales_at: new Date().toISOString(),
    };

    if (!data.products_id) {
      return res.status(400).json({ error: "Products empty" });
    }

    const newSale = await prisma.sales.create({ data });

    return res.status(200).json(newSale);
  } catch(error) {
    console.error("Error [asignRolToUserById]: ", error);
    return res.status(400).json({ error: "Internal server error" });
  }
}

const updateSales = async (req, res) => {
  try {
    const salesId = req.params?.id;
    const data = req.body ?? {};

    if (!salesId) {
      return res.status(404).json({ error: "Sales not found" });
    }

    const sales = await prisma.sales.update({
      where: { id: +salesId },
      data,
    });

    return res.status(200).json(sales);
  } catch(error) {
    console.error("Error [asignRolToUserById]: ", error);
    return res.status(400).json({ error: "Internal server error" });
  }
}

const deleteSales = async (req, res) => {
  try {
    const salesId = req.params?.id;

    if (!salesId) {
      return res.status(404).json({ error: "Sales not found" });
    }

    const salesDeleted = await prisma.sales.delete({ where: { id: +salesId }});

    return res.status(200).json(salesDeleted);
  } catch(error) {
    console.error("Error [asignRolToUserById]: ", error);
    return res.status(400).json({ error: "Internal server error" });
  }
}

module.exports = {
  getSales,
  createSales,
  updateSales,
  deleteSales,
}