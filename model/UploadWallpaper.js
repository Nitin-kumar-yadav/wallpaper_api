import mongoose from "mongoose";

const uploadWallpaperSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
})

const UploadWallpaper = mongoose.model("UploadWallpaper", uploadWallpaperSchema);
export default UploadWallpaper;