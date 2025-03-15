import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Project } from "../models/project.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";
import { image_ID_Parser } from "../utils/imageParser.js";

const addNewProject = asyncHandler(async (req, res, next) => {
  if (!req.files && !req.files.image) {
    throw new ApiError("Image is required", 400);
  }
  const { title, description, projectUrl, gitRepoUrl, stack, deployed } =
    req.body;
  if (!title || !description || !stack || !deployed) {
    throw new ApiError("All fields are required", 400);
  }
  const imageLocalPath = req.files.image[0].path;
  const image = await uploadOnCloudinary(imageLocalPath, "image");
  if (!image) {
    throw new ApiError("Failed to upload image", 500);
  }
  const newProject = await Project.create({
    title: title,
    description: description,
    projectUrl: projectUrl,
    gitRepoUrl: gitRepoUrl,
    stack: stack,
    deployed: deployed,
    image: image.url || "",
  });
  if (!newProject) {
    return next(new ApiError("Failed to create new project", 500));
  }
  res.status(201).json(new ApiResponse("Project created", newProject));
});

const getAllProject = asyncHandler(async (req, res, next) => {});

const deleteProject = asyncHandler(async (req, res, next) => {});

const updateProject = asyncHandler(async (req, res, next) => {});

const getProject = asyncHandler(async (req, res, next) => {});

export {
  addNewProject,
  getAllProject,
  deleteProject,
  updateProject,
  getProject,
};
