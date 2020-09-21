exports.successResponse = function (res, msg,key,data) {
	var data = {
		code:0,
		status:200,
		msg: msg,
		[key]:data
	};
	return res.json(data);
};

exports.ErrorResponse = function (res, msg) {
	var data = {
		code: 1,
		status:500,
		msg: msg,
	};
	return res.json(data);
};