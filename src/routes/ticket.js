const express = require('express');
const router = express.Router();
const Controller = require('../controllers/ticket');
const { check, validationResult } = require('express-validator');
const checkValidator = function (req, res, next) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(404).json({ code:1,msg:'validation error',errors:errors.array() });
	}
	next();
   
};


router.get('/', Controller.TicketsWithFilter);

router.post('/add', [
	check('title', 'title is not empty.').notEmpty(),
	check('message', 'message is not empty').notEmpty(),
	check('file',).optional(),
], checkValidator, Controller.addTicket);


router.post('/addMessageToTicket', [
	check('message', 'message is not empty').notEmpty(),
	check('ticketId', 'ticketId is not empty').notEmpty(),
], checkValidator, Controller.addMessageToTicket);


router.post('/deleteMessageToTicket', [
	check('ticketId', 'ticketId is not empty').notEmpty(),
	check('messageId','messageID is not empty').notEmpty(),
], checkValidator, Controller.deleteMessageToTicket);




module.exports = router;