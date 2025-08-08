const { Router } = require('express');
const { middleware } = require('@iKernel');
const apiRouter = require('../../routes');

const router = Router();
router.use(middleware.api, apiRouter);

router.use('/404', (req, res) => {
    return res.render("errors/404")
})

module.exports = router;