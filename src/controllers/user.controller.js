import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Validate fields
    if ([username, email, password].some(field => !field || field.trim() === "")) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email or username already exists"
      });
    }

    // 3. HASH THE PASSWORD BEFORE SAVING
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create user in DB
    const createdUser = await User.create({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      loggedIn: false
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: createdUser._id,
        username: createdUser.username,
        email: createdUser.email
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};



export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    // 2. Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // 3. Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // 4. Update login status
    user.loggedIn = true;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Login successful",
      userId: user._id,
      username: user.username
    });

  } catch (error) {
    console.error("🔥 Error in loginUser:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};
