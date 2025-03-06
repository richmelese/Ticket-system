const Ticket = require("../models/Ticket");
const User = require("../models/User");

// Dashboard statistics
exports.getDashboardCounts = async (req, res) => {
  try {
    const totalTickets = await Ticket.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalClosed = await Ticket.countDocuments({ status: "Closed" });
    const totalOpen = await Ticket.countDocuments({ status: "Open" });

    res.status(200).json({
      totalTickets,
      totalUsers,
      totalClosed,
      totalOpen,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
