const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  description: String,
  status: { type: String, enum: ["Open", "In Progress", "Closed"], default: "Open" },
});

module.exports = mongoose.model("Ticket", TicketSchema);
