import { comparePassword, hashPassword } from "../helper/authHelper.js";
import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";


export const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name) {
            return res.send({ error: "Name is required" });
        }
        if (!email) {
            return res.send({ error: "Email is required" });
        }
        if (!password) {
            return res.send({ error: "Password is required" });
        }
        
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: "Already registered, please login",
            });
        }

        const hashedPassword = await hashPassword(password);
        const user = await new UserModel({ name, email, password: hashedPassword }).save();
        
        res.send({
            success: true,
            message: "User registered successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in registration",
            error,
        });
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email or password is missing
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Find the user
        const user = await UserModel.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered",
            });
        }

        // Compare passwords
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(400).send({
                success: false,
                message: "Incorrect password",
            });
        }

        const JWT_SECRET = "asdfksahfsakjdfj";
        // Generate token
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        // Set cookie with token
        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 60 * 1000), // Cookie expires in 1 hour
            secure: process.env.NODE_ENV === 'production', // Set secure flag for production
        });

        // Send response with token and user data
        res.status(200).send({
            success: true,
            message: "Login successful",
            token: token,
            user: {
                name: user.name,
                email: user.email,
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        });
    }
};
