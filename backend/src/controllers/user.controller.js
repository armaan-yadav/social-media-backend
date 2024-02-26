import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import bcrypt from "bcrypt";
const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  console.log(users);
  if (!users) {
    throw new ApiError(404, "No Users found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Users fetched successfully", users));
});
const signUp = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  //check the input values
  if ([name, email, password].some((e) => e.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  //check for already existing user
  const alreadyExisting = await User.findOne({ email });
  if (alreadyExisting) {
    return new ApiResponse(400, "User already exists", {});
  }
  //hashing the password b4 storing the DB
  const hashedPassword = bcrypt.hashSync(password, 10);
  //creating a new user object
  const user = new User({
    email,
    password: hashedPassword,
    name,
  });
  //saving the newly created user object
  try {
    await user.save();
  } catch (error) {
    console.log("Error while saving the user ,  ERROR : ", error);
  }

  return res
    .status(201)
    .json(new ApiResponse(201, "User created successfully", user));
});
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //check if  email and password are not empty string
  if (email.trim() === "" || password.trim() === "") {
    throw new ApiError(400, "Email and password is mandatory");
  }
  //check if the user is alredy there in databse or not
  const alreadyExisting = await User.findOne({ email });
  if (!alreadyExisting) {
    throw new ApiError(200, "User does not exist! Register yourself");
  }

  console.log(email, password);
  console.log(alreadyExisting);
  // console.log(password, alreadyExisting.password);
  //check if the password is correct
  const isPasswordCorrect = bcrypt.compareSync(
    password,
    alreadyExisting?.password
  );
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Wrong Password! Try again");
  }

  return res.status(200).json(new ApiResponse(200, "Login Successfull", {}));
});

export { getAllUsers, signUp, login };
