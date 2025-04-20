import mongoose, { Schema, model, models } from "mongoose";
import bcrypts from "bcryptjs";

// Define the IUser interface
export interface IUser{
    email: string;
    password: string;
    _id?: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

// Define the userSchema
const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

// Add a method to the userSchema to compare passwords
userSchema.pre("save", async function(next){
    if(this.isModified("password")){ // Check if the password has been modified
        this.password = await bcrypts.hash(this.password, 10); // Hash the password
    }
    next();
});


const User = models?.User || model<IUser>("User", userSchema); // Create the User model

export default User;