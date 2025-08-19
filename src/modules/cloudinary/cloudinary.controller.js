const { uploadToCloudinary } = require('./cloudinary.service');
const { HTTPStatusCode } = require('@constants');

const uploadAvatar = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(HTTPStatusCode.BadRequest).sendData({ message: 'No file uploaded' });
        }
        const result = await uploadToCloudinary(req.file, 'avatars');
        if (!result) {
            return res.status(HTTPStatusCode.InternalServerError).sendData({ message: 'Failed to upload avatar' });
        }
        res.status(HTTPStatusCode.Ok).sendData({ url: result.secure_url });
    } catch (error) {
        res.status(HTTPStatusCode.InternalServerError).sendData({ message: error.message });
    }
}

module.exports = {
    uploadAvatar,
}

