import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    fullName: {type: String, required: [true,  'FullName is required']},
    email: {type: String, required: [true, 'Email is required'], unique: [true, 'Email already exists!']},
    photoUrl: {type: String, required: false, default: ''},
    googleId: {type: String, required: [true, 'Google Id is required']},
    role: {type: String, default: 'Student'},
    fbToken: {type: String, required: false, default: null},
    hasFbToken: {type: Boolean, default: false},
    createdAt: {type: Date, default: new Date},
    modifiedAt: {type: Date, default: null}
});

const User = mongoose.model('User', UserSchema);

export default User;