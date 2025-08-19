const { Router } = require('express');
const authRouter = require('./modules/auth/auth.route');
const accountRouter = require('./modules/account/account.route');
const cloudinaryRouter = require('./modules/cloudinary/cloudinary.route');
const authMiddleware = require('./middlewares/authMiddleware');
const apiRouter = Router();

const routes = [
    { path: "/auth", handler: authRouter },
    { path: "/account", handler: accountRouter, isProtected: true },
    { path: "/cloudinary", handler: cloudinaryRouter, isProtected: true },
];


routes.forEach(({ path, handler, isProtected }) => {
    if (isProtected) {
        apiRouter.use(path, authMiddleware, handler);
    } else {
        apiRouter.use(path, handler);
    }
});

module.exports = apiRouter;