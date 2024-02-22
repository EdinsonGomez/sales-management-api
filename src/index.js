const express = require("express");
const usersRouter = require("./routes/users");
const rolesRouter = require("./routes/roles");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/users", usersRouter);
app.use("/roles", rolesRouter);

app.listen(PORT, () => {
  console.log('Server listening on port: ', PORT);
});