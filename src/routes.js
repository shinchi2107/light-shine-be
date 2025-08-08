const { Router } = require('express');
const authRouter = require('./modules/auth/auth.route');

const apiRouter = Router();

const routes = [
    { path: "/auth", handler: authRouter },
];

routes.forEach(({path, handler}) => apiRouter.use(path, handler));

module.exports = apiRouter;