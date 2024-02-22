const express = require("express");
const usersRouter = require("./routes/users");
const rolesRouter = require("./routes/roles");
const productsRouter = require("./routes/products");
const salesRouter = require("./routes/sales");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/users", usersRouter);
app.use("/roles", rolesRouter);
app.use("/products", productsRouter);
app.use("/sales", salesRouter);

app.listen(PORT, () => {
  console.log('Server listening on port: ', PORT);
});