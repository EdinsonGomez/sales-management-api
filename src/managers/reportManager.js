const moment = require("moment");
const prisma = require("../db");
const { getSalesWithTotal } = require("../utils/salesUtils");

const getSalesByDateRange = async (startDate, endDate) => {
  let sales = await getSalesWithTotal({
    where: {
      sales_at: {
        gte: startDate,
        lte: endDate
      }
    }
  });

  const total = await prisma.$queryRaw`
    SELECT SUM(s.qty * p.price) AS total_sold
    FROM "Sales" AS s
    INNER JOIN "Products" AS p ON s.products_id = p.id
    WHERE s.sales_at >= ${new Date(startDate)} AND s.sales_at <= ${new Date(endDate)};
  `;

  const total_sold = Number(total[0].total_sold);

  return {
    sales,
    total_sold,
  }
}

const getReportSalesByDate = async (req, res) => {
  try {
    const dateQuery = req.query?.date;

    if (!dateQuery) {
      return res.status(400).json({ error: "Date is empty" });
    }

    const startDate = moment.utc(dateQuery).startOf('day').toISOString();
    const endDate = moment(dateQuery).endOf('day').toISOString();

    const sales = await getSalesByDateRange(startDate, endDate);

    return res.status(200).json(sales);
  } catch(error) {
    console.error("Error [asignRolToUserById]: ", error);
    return res.status(400).json({ error: "Internal server error" });
  }
}

const getReportSalesMonth = async (req, res) => {
  try {
    const startDate = moment.utc().startOf("month").startOf("day").toISOString();
    const endDate = moment.utc().endOf("month").endOf("day").toISOString();

    const sales = await getSalesByDateRange(startDate, endDate);

    return res.status(200).json(sales);
  } catch(error) {
    console.error("Error [asignRolToUserById]: ", error);
    return res.status(400).json({ error: "Internal server error" });
  }
}

module.exports = {
  getReportSalesByDate,
  getReportSalesMonth,
}