const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const connectDatabase = require("./src/db/dbConnection");
const errorCatcherMiddleware = require("./src/middleware/errorCatcher");

app.use(cors());
app.use(bodyParser.json());

const users = require("./src/routes/userRoutes");

connectDatabase();

app.use("/users", users);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`running in port ${port}`);
});

app.use(errorCatcherMiddleware);
