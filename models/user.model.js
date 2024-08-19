import mongoose from "mongoose"

const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 4,
        required: true,
    },
    role: {
        type: String,
        default: "user",
        required: true,
    },
});

const User = mongoose.model("user", UserSchema);

export default User;
