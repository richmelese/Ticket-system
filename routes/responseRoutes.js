const express = require("express");
const { addResponse, getUserResponses, getAllResponses, getResponseById } = require("../controllers/responseController");
const { authenticate, authorizeAdmin } = require("../middleware/authMiddleware");

const router = express.Router();


router.post("/respond/:ticketId", authenticate, authorizeAdmin, addResponse);

router.get("/responses", authenticate, getUserResponses);
router.get("/responses/all", authenticate, authorizeAdmin, getAllResponses);
router.get("/responses/:responseId", authenticate, getResponseById);


module.exports = router;