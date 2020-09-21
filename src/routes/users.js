const express = require('express');
const router = express.Router();
const Controller = require('../controllers/users');
const { check, validationResult } = require('express-validator');
const checkValidator = function (req, res, next) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(404).json({ code:1,msg:'validation error',errors:errors.array() });
	}
	next();
   
};


router.post('/login', [
	check('email', 'email is not empty.').isEmail(),
	check('password', 'password is not empty').isString(),
], checkValidator, Controller.login);


router.post('/register', [
	check('email', 'email is not empty.').isEmail(),
	check('password', 'password is not empty').isString(),
], checkValidator, Controller.register);







module.exports = router;