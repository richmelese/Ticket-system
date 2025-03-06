const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ticketId: { type: mongoose.Schema.Types.ObjectId, ref: "Ticket", required: true },
  responseText: { type: String, required: true },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Admin who responded
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Response", responseSchema);
