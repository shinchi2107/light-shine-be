const { Router } = require('express');

const apiRouter = Router();

const routes = [];

routes.forEach(({path, handler}) => apiRouter.use(path, handler));

module.exports = apiRouter;