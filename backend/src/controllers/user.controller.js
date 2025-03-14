import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, "User not found");

    if (!user.generateRefreshToken || !user.generateAccessToken) {
      throw new ApiError(500, "Token generation methods are missing");
    }

    const refreshToken = user.generateRefreshToken();
    const accessToken = user.generateAccessToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Error while generating tokens");
  }
};

const registerUser = asyncHandler(async (req, res, next) => {
  const {
    fullname,
    email,
    password,
    aboutMe,
    phone,
    portfolioURL,
    githubURL,
    linkedinURL,
    facebookURL,
    twitterURL,
    instagramURL,
  } = req.body;
  if (
    [fullname, email, password, aboutMe, phone].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError("Please fill in all fields", 400);
  }
  const existedUser = await User.findOne({
    $or: [{ email }, { phone }],
  });
  if (existedUser) {
    throw new ApiError("User already exists", 400);
  }
  const avatarLocalPath = req.files?.avatar[0].path;
  const resumeLocalPath = req.files?.resume[0].path;
  if (!avatarLocalPath) {
    throw new ApiError("Please upload an avatar", 400);
  }
  if (!resumeLocalPath) {
    throw new ApiError("Please upload a resume", 400);
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath, "avatar");
  const resume = await uploadOnCloudinary(resumeLocalPath, "resume");

  if (!avatar || !resume) {
    throw new ApiError("Error while uploading files", 500);
  }
  const user = await User.create({
    fullname,
    email,
    password,
    aboutMe,
    phone,
    portfolioURL,
    githubURL,
    linkedinURL,
    facebookURL,
    twitterURL,
    instagramURL,
    avatar: avatar?.url || "",
    resume: resume?.url || "",
  });
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "user not created");
  }
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: createdUser, // Changed from loggedInUser to createdUser
          accessToken,
          refreshToken,
        },
        "User registered successfully" // Changed message to reflect registration
      )
    );
});

export { registerUser };
