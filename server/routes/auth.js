import express from "express";

const router = express.Router();

// middleware
import { requireSignin } from "../middlewares";

// controllers
import {
  register,
  login,
  logout,
  currentUser,
  forgotPassword,
  resetPassword,
  uploadImage,
  removeImage,
  updateAccount
} from "../controllers/auth";

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post('/upload-image', uploadImage)
router.post('/remove-image', removeImage)
router.put('/update-account', updateAccount)
router.get("/current-user", requireSignin, currentUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
