import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from '../models/userModel.js';

export const continueWithGoogle = async (req, res) => {
  try {
    const { fullName, email, photoUrl, googleId, fbToken } = req.body;

    if (!email || !googleId || !fullName) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // ✅ Apply role assignment rules
    let role = '';
    if (email.startsWith('np02') && email.endsWith('@bicnepal.edu.np')) {
      role = 'Student';
    } else if (!email.startsWith('np02') && email.endsWith('@bicnepal.edu.np')) {
      role = 'Admin';
    } else {
      return res.status(403).json({ message: 'Unauthorized domain or email format' });
    }

    // ✅ Check if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create user if not found
      user = await User.create({
        fullName,
        email,
        photoUrl,
        googleId,
        fbToken,
        role,
        hasFbToken: !!fbToken,
      });
    }

    const payload = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      photoUrl: user.photoUrl,
      googleId: user.googleId,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    return res.status(200).json({ message: 'Login successful', token, user: payload });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const registerFbToken = async (req,res) => {
  try {
    const id = req.user.id;
    const {fbToken} = req.body;
    const updateFbToken = await User.findByIdAndUpdate(id, 
      { fbToken, modifiedAt: new Date },
      { new: true });

       if (!updateFbToken) {
      return res.status(404).json({ message: 'User not found' });
    }
      return res.status(200).json({message: 'Firebase token update successfully'});
  } catch (err) {
    return res.status(500).json({message: err.message})
  }
}