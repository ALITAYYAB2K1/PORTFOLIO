import { asyncHandler } from "../utils/asyncHandler.js";
import { Message } from "../models/message.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const sendMessage = asyncHandler(async (req, res, next) => {
  const { senderName, subject, message } = req.body;
  if (!senderName || !subject || !message) {
    return next(new ApiError(400, "Please provide all fields"));
  }
  const data = await Message.create({ senderName, subject, message });
  res.status(201).json(new ApiResponse(201, data));
});

export { sendMessage };
