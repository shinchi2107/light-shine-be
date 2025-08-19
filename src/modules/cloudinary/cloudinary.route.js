const express = require('express');
const router = express.Router();
const { uploadAvatar } = require('./cloudinary.controller');
const multer = require('multer');

//Multer with memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload-avatar', upload.single('avatar'), uploadAvatar);

module.exports = router;