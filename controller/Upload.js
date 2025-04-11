import { v2 as cloudinary } from 'cloudinary';
import { configDotenv } from "dotenv";
import UploadWallpaper from '../model/UploadWallpaper.js';
import AdminPannel from '../model/AdminPannel.js';

configDotenv();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

export const uploadFile = async (req, res) => {

    const { id } = req.params;
    console.log(id);
    console.log(typeof id)
    const Authorization = await AdminPannel.findById(id);
    if (!Authorization) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    else {
        try {
            if (
                !req.body.name ||
                !req.body.category ||
                !req.body.description ||
                !req.files?.image
            ) {
                return res.status(400).json({ message: 'Please provide all required fields' });
            }

            const file = req.files.image;

            cloudinary.uploader.upload(file.tempFilePath, async (error, result) => {
                if (error) {
                    console.error('Cloudinary error:', error);
                    return res.status(400).json({
                        error: 'File is not uploaded',
                    });
                }

                const uploadData = new UploadWallpaper({
                    name: req.body.name,
                    category: req.body.category,
                    description: req.body.description,
                    image: result.secure_url
                });

                try {
                    const savedData = await uploadData.save();
                    return res.status(200).json({
                        message: 'File uploaded successfully',
                        data: savedData
                    });
                } catch (saveError) {
                    console.error('Error saving to DB:', saveError);
                    return res.status(400).json({
                        error: 'File is not saved',
                    });
                }
            });

        } catch (error) {
            console.error('Error uploading file:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}
