const mongoose = require('mongoose');
const moment = require('moment-timezone');
const istanbulTimeZone = moment.tz(Date.now(), 'Europe/Istanbul');

const messages = new mongoose.Schema({
	text:{
		type: String,
	},
	createdDate:{
		type:Date,
		default:istanbulTimeZone
	},
	role:{
		type:Number
	}
})

const Schema = new mongoose.Schema({
	status:{
		type:Number, // 0=opened , 1=waiting for admin respond , 2=waiting for user respond , 3=closed
		default:0,
	},
	title: {
		type: String,
	},
	userId:{
		type:String,
	},
	userEmail:{
		type:String,
	},
	messages: {
		type: [messages]
    },
    files:{
        type:Array
    },
	createdDate:{
		type:Date,
		default:istanbulTimeZone
	}
});
module.exports = mongoose.model('ticket', Schema);