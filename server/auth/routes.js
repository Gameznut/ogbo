const express = require('express');
const router = express.Router()
const authController = require('../controller/authController');

router.route('/')
    .get(authController.index);

router.route('/login')
    // .get(authController.loginGet)
    .post(authController.loginPost);

router.route('/login/:id')
    .get(authController.userGet)
    .post(authController.loginPost);


router.route('/signup')
    .get(authController.signupGet)
    .post(authController.signupPost);

module.exports = router;