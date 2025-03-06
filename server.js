const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const dashboardRoutes = require("./routes/dashboardRoutes");
const authRoutes = require("./routes/authRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const responseRoutes = require("./routes/responseRoutes");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());




app.use("/api", dashboardRoutes);
app.use("/api", responseRoutes);
app.use("/api", authRoutes);
app.use("/api", ticketRoutes);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
