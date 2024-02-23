const prisma = require("../db");

const getSalesWithTotal = async (query = {}) => {
  const salesFound = await prisma.sales.findMany({
    ...query,
    include: { products: true }
  });

  const salesWithTotal = salesFound.map((s) => ({
    ...s,
    total: s.qty * s.products.price
  }));

  return salesWithTotal;
}

module.exports = {
  getSalesWithTotal,
}