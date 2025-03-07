import { genSalt, hash } from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is Required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: [true, "Password is Required"],
        minLength: 6,
    },
    firstName: {
        type: String,
        trim: true,
        minLength: 2,
        maxLength: 50,
    },
    lastName: {
        type: String,
        trim: true,
        minLength: 2,
        maxLength: 50,
    },
    image: {
        type: String,
        trim: true,
    },
    color: {
        type: Number,
    },
    profileSetup: {
        type: Boolean,
        default: false,
    }
},  { timestamps: true });


//password encryption
userSchema.pre("save", async function(next){
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
    next();
})

const User = mongoose.model('User', userSchema);

export default User;