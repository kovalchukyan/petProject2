const { Router } = require('express');
const userRouter = require('./user');
const contactsRouter = require('./contacts');

const router = new Router();

router.use('/user', userRouter);
router.use('/contacts', contactsRouter);

module.exports = router;