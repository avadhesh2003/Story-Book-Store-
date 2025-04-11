import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
export const signup = async(req, res) => {
    try {
        // Validate request body
        const { fullname, email, password } = req.body;

        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashPassword = await bcryptjs.hash(password, 10);

        // Create new user
        const createdUser = new User({
            fullname,
            email,
            password: hashPassword,
        });

        // Save user to database
        const savedUser = await createdUser.save();

        // Return success response
        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: savedUser._id,
                fullname: savedUser.fullname,
                email: savedUser.email,
            },
        });
    } catch (error) {
        console.log("Signup Error:", error);

        // Handle validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }

        // Handle duplicate key error
        if (error.code === 11000) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Handle other errors
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
export const login = async(req, res) => {
    try {
        // Validate request body
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find user by email
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Compare passwords
        const isMatch = await bcryptjs.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Return success response
        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
            },
        });
    } catch (error) {
        console.log("Login Error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};