const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectdb = require("./config/db");
const port = process.env.PORT || 5000;

connectdb();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set it to Production"));
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server started at port ${port}`));
