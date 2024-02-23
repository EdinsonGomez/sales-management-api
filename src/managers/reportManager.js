const moment = require("moment");
const prisma = require("../db");

const getSalesByDateRange = async (startDate, endDate) => {
  const sales = await prisma.sales.findMany({
    where: {
      sales_at: {
        gte: startDate,
        lte: endDate
      }
    }
  });

  return sales;
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

module.exports = {
  getReportSalesByDate,
}