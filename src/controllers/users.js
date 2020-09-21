const userFunctions = require('../functions/users');
const response = require('../_helpers/response');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
module.exports = {
	login: async function (req, res, next) {
		await userFunctions.FindWithKey('email', req.body.email).then(userInfo => {
			console.log(req.body);
			if (userInfo != null) {
				bcrypt.compare(req.body.password.toString(), userInfo.password.toString(), async function (err, result) {
					console.log(result);
					if (result) {
						const token = jwt.sign({ id: userInfo._id }, req.app.get('secretKey'), { expiresIn: '30 days' });
						const response_data = {
							role: userInfo.role,
							email: userInfo.email,
							token: token
						};
						response.successResponse(res, 'succesfuly', 'data', response_data);
					} else {
						response.ErrorResponse(res, 'invalid email/password');
					}
				});

			} else {
				response.ErrorResponse(res, 'invalid email/password!!! : ',userInfo);
			}
		}).catch(err => {
			response.ErrorResponse(res, 'user not found  : ' + err);
		});
	},
	register: async function (req, res, next) {
		await userFunctions.FindWithKey('email', req.body.email).then(async userInfo => {
			if (!userInfo) {
				bcrypt.genSalt(saltRounds, async function (err, salt) {
					bcrypt.hash(req.body.password.toString(), salt, async function (err, hash) {
						const data = {
							'email': req.body.email,
							'password': hash
						};
						await userFunctions.push(data).then(result => {
							response.successResponse(res, 'succesfuly', 'data', userInfo);
						}).catch(err => {
							response.ErrorResponse(res, 'user not found  : ' + err);
						});
					});
				});

			} else {
				response.ErrorResponse(res, 'user already registered ');
			}
		}).catch(err => {
			response.ErrorResponse(res, 'user not found 2  : ' + err);
		});


	},


};