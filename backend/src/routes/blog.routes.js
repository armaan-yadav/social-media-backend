import { Router } from "express";
import {
  addBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
} from "../controllers/blog.controller.js";

const router = Router();
router.get("/", getAllBlogs);
router.post("/add", addBlog);
router.put("/update/:id", updateBlog); //put request is used for updating the data in database;
router.get("/get/:id", getBlogById);
router.delete("/:id", deleteBlog);

export default router;
