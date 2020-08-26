const express = require('express');
const router = express.Router();
const Controller = require('../controllers/record');
const { check, validationResult } = require('express-validator');
const checkValidator = function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({ code:1,msg:"validation error",errors:errors.array() });
    }
    next()
}
router.post('/filteredRecords', [
    check('startDate', 'startDate should be a date.').isDate(),
    check('endDate', 'endDate should be a date.').isDate(),
    check('maxCount', 'maxCount should be an integer.').isInt(),
    check('minCount', 'minCount should be an integer.').isInt()
], checkValidator, Controller.records);

module.exports = router;