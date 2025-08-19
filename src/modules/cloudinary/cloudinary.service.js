const cloudinary = require('@configs/cloudinary');
const streamifier = require('streamifier');
const uploadToCloudinary = async (file, folder = "uploads") => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder, public_id: file.originalname.split(".")[0] },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );
        
        streamifier.createReadStream(file.buffer).pipe(uploadStream);

        uploadStream.on('error', (error) => {
            reject(error);
        });
    });
}

module.exports = {
    uploadToCloudinary,
}
