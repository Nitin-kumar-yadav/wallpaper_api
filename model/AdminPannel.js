import mongoose from "mongoose";

const adminPannelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const AdminPannel = mongoose.model("AdminPannel", adminPannelSchema);
export default AdminPannel;