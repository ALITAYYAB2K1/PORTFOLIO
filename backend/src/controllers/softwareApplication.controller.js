import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { SoftwareApplication } from "../models/softwareApplication.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addNewApplication = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    throw new ApiError("Name is required", 400);
  }
  if (!req.files || !req.files.svg) {
    throw new ApiError("SVG is required", 400);
  }
  const svglocalPath = req.files.svg[0].path;
  const svg = await uploadOnCloudinary(svglocalPath, "svg");
  const newApplication = await SoftwareApplication.create({
    name: name,
    svg: svg.url || "",
  });
  if (!newApplication) {
    return next(new ApiError("Failed to create new application", 500));
  }
  res.status(201).json(new ApiResponse("Application created", newApplication));
});

const getAllApplication = asyncHandler(async (req, res, next) => {});
const deleteApplication = asyncHandler(async (req, res, next) => {});

export { addNewApplication, getAllApplication, deleteApplication };
