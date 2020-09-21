const mongoose = require('mongoose');
const moment = require('moment-timezone');
const istanbulTimeZone = moment.tz(Date.now(), 'Europe/Istanbul');


const Schema = new mongoose.Schema({
	email: {
		type: String,
	},
	password: {
		type: String
	},
	role: {
		type: Number,
		default:1
	},
	createdDate:{
		type:Date,
		default:istanbulTimeZone
	}
});
module.exports = mongoose.model('users', Schema);