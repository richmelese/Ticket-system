const Response = require("../models/Response");
const Ticket = require("../models/Ticket");

// ✅ Admin adds a response
// exports.addResponse = async (req, res) => {
//   try {
//     const { responseText } = req.body;
//     const { ticketId } = req.params;
//     const adminId = req.user.id; // Get admin ID from JWT

//     // Check if the ticket exists
//     const ticket = await Ticket.findById(ticketId);
//     if (!ticket) return res.status(404).json({ message: "Ticket not found" });

//     // Create response
//     const response = new Response({
//       userId: ticket.userId, // User who created the ticket
//       ticketId,
//       responseText,
//       adminId,
//     });

//     await response.save();
//     res.status(201).json({ message: "Response sent successfully", response });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.addResponse = async (req, res) => {
  try {
    const { responseText, status } = req.body;
    const { ticketId } = req.params;
    const adminId = req.user.id; 

  
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    // Create response
    const response = new Response({
      userId: ticket.userId, 
      ticketId,
      responseText,
      adminId,
    });

    await response.save();

    // Update ticket status
    ticket.status = status || "In Progress"; 
    await ticket.save();

    res.status(201).json({ message: "Response sent successfully and ticket status updated", response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ✅ Users fetch their responses
exports.getUserResponses = async (req, res) => {
  try {
    const userId = req.user.id;
    const responses = await Response.find({ userId }).populate("ticketId", "title description");
    res.status(200).json(responses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  
};
exports.getAllResponses = async (req, res) => {
  try {
    const responses = await Response.find().populate("ticketId", "title description");
    res.status(200).json(responses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getResponseById = async (req, res) => {
  try {
    const { responseId } = req.params;
    const response = await Response.findById(responseId).populate("ticketId", "title description");

    if (!response) {
      return res.status(404).json({ message: "Response not found" });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





