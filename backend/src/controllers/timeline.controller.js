import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Timeline } from "../models/timeline.model.js";

const addTimeline = asyncHandler(async (req, res, next) => {
  const { title, description, from, to } = req.body;
  const timeline = await Timeline.create({
    title,
    description,
    timeline: { from, to },
  });
  if (!timeline) {
    return next(new ApiError("Timeline not created", 400));
  }
  res
    .status(201)
    .json(new ApiResponse("Timeline created successfully", timeline));
});

const getAllTimelines = asyncHandler(async (req, res, next) => {});

const deleteTimeline = asyncHandler(async (req, res, next) => {});

export { addTimeline, getAllTimelines, deleteTimeline };
