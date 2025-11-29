import { User } from "../models/user.model.js";

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

    // 3. Create new user in DB
    const createdUser = await User.create({
      username,
      email: email.toLowerCase(),
      password,
      loggedIn: false
    });

    // 4. Respond back
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: createdUser
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

export {
    registerUser
}