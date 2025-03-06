const express = require("express");
const { getDashboardCounts } = require("../controllers/dashboardController");
const { authenticate, authorizeAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/dashboard", authenticate, getDashboardCounts);

module.exports = router;
