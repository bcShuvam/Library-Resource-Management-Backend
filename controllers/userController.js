import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from '../models/userModel.js';

export const register = async (req, res) => {
    try {
        if(!req.body) return res.status(400).json({message: 'body is required'});
        const {fullName, email, photoUrl, googleId, role, fbToken} = req.body;
        let hasFbToken = false;
        if(fbToken.length > 0){
            hasFbToken = true
        }

        const newUser = await User.create({
            fullName,
            email,
            photoUrl,
            googleId,
            role,
            fbToken,
            hasFbToken
        });

        return res.status(201).json({message: 'Registered Successfully', newUser})
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}

export const login = async (req, res) => {
    try {
        if(!req.body) return res.status(400).json({message: 'body is required'});
        const {fullName, email, photoUrl, googleId, role, fbToken} = req.body;
        let hasFbToken = false;
        if(fbToken.length > 0){
            hasFbToken = true
        }

        const payload = {
            fullName,
            email,
            photoUrl,
            googleId,
            role,
            fbToken,
            hasFbToken
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET
        );

        return res.status(201).json({message: 'Login Successfully', token, user: payload })
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}