
exports.successResponse = function (res, msg,key,data) {
	var data = {
        code:0,
        msg: msg,
        [key]:data
	};
	return res.status(200).json(data);
};




exports.ErrorResponse = function (res, msg) {
	var data = {
		code: 1,
		msg: msg,
	};
	return res.status(500).json(data);
};



