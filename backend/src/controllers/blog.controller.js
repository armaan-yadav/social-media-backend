import { Blog } from "../models/blog.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getAllBlogs = asyncHandler(async (req, res, next) => {
  const blogs = await Blog.find();
  if (!blogs) {
    throw new ApiError(404, "Couldn't fetch blogs!!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "All Blogs Fetched Successfully", blogs));
});

export const addBlog = asyncHandler(async (req, res, next) => {
  const { title, description, image, user } = req.body;

  //creating  a new blog
  const blog = new Blog({
    title,
    description,
    owner: user,
    image,
  });

  if (!blog) {
    throw new ApiError(404, "Error while creating a new blog");
  }

  try {
    blog.save();
  } catch (error) {
    console.log("Error while saving the blog to database , ERROR : ", error);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Blog added successfully", blog));
});

export const updateBlog = asyncHandler(async (req, res, next) => {
  const blogId = req.params.id;
  const { title, description } = req.body;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, { title, description });
  } catch (error) {
    console.log(error);
  }
  if (!blog) {
    throw new ApiError(401, "No blog found with ID : ", blogId);
  }

  //increases the DB call but i think it'd be better for frontend if we return the updated blog object
  blog = await Blog.findById(blogId);

  return res
    .status(200)
    .json(new ApiResponse(200, "Blog Updated successfully", blog));
});
export const deleteBlog = asyncHandler(async (req, res, next) => {
  const blogId = req.params.id;
  const blog = await Blog.findByIdAndDelete(blogId);
  console.log(blog);
  if (!blog) {
    throw new ApiError(404, "Error while deleteing the blog. Try Again.");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "Blog Deleted Successfully"));
});
export const getBlogById = asyncHandler(async (req, res, next) => {
  const blogId = req.params.id;

  const blog = await Blog.findById(blogId);

  if (!blog) {
    throw new ApiError(404, "Couldn't find blog with given id");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Blog Fetched Successfully", blog));
});
