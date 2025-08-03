import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name:
    {
        type: String,
        unique: true
    },
    email:
    {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    bio: {
        type: String,
    },
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.matchPassword=async function(enteredPassword){
    const isPasswordCorrect=await bcrypt.compare(enteredPassword,this.password)
    return isPasswordCorrect
}

const User = mongoose.model('User', userSchema);
export default User;
