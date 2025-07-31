require('module-alias/register.js');
require('dotenv/config');
const express = require('express');
const cors = require('cors');    
const { middleware } = require("@iKernel");
const router = require("@iKernel/router");
const { connectDB } = require('@configs/database.js');
const app = express();
const { PORT, NODE_ENV } = process.env;

connectDB();

if (NODE_ENV === 'development') {
	app.use(cors());
}

app.use(express.json());

const kernelMiddleware = middleware.common;

app.use(router)
app.use(kernelMiddleware.after);

app.listen(PORT, () => {
	console.log(`Server is Fire at http://localhost:${PORT}`);
});