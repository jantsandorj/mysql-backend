const express = require("express");
const cors = require("cors");
const fs = require("fs");

const port = 9000;
const app = express();

app.use(cors());
app.use(express.json());

const menuRouter = require("./routes/menu.route");
const categoryRouter = require("./routes/category.route");
const productRouter = require("./routes/product.category");
const products = require("./routes/product");
const carddata = require("./routes/carddata.route");
const userdata = require("./routes/userdata");

app.listen(port, () => console.log("server is running"));

app.get("/api", (req, res) => {
  res.json({ message: "Welcome Rest Api" });
});

app.use("/api", menuRouter);
app.use("/api", categoryRouter);
app.use("/api", productRouter);
app.use("/api", products);
app.use("/api", carddata);
app.use("/api", userdata);
