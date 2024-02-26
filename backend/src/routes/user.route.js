import { Router } from "express";
import { getAllUsers, login, signUp } from "../controllers/user.controller.js";

const router = Router();

//public routes
router.get("/get", getAllUsers);
router.post("/signup", signUp);
router.post("/login", login);

//private routes

export default router;
