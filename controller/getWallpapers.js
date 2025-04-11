import UploadWallpaper from "../model/UploadWallpaper.js";

export const getWallpapers = async (req, res) => {
    try {

        const wallpapers = await UploadWallpaper.find();

        if (wallpapers.length === 0) {
            return res.status(404).json({ message: 'No wallpapers found for this category' });
        }

        res.status(200).json(wallpapers);
    } catch (error) {
        console.error('Error fetching wallpapers:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}