const UserModel = require('../model/users');

module.exports = {

	push: async function (data) {
		// some push functions are here 
		new Promise(function () {
			return UserModel.create(data).then(result => {
				return result; // resolve try block
			}).catch(err => { // resolve catch block 
				throw new Error(err);
			});
		});
	},
	list: async function () {
		// some list functions are here 
	},
	filter: async function (data) {
		return new Promise(async (resolve, reject) => {
			// return async promises 
			// query start
			await UserModel.aggregate([
				{
					$project: {
						key: '$key',
						createdAt: '$createdAt',
						sumOfNumber: {
							$sum: '$counts'
						}
					}
				}, // first $project is do sum of counts field 
				{
					$match: {
						createdAt: {
							$gte: new Date(data.startDate),
							$lt: new Date(data.endDate)
						}, // like a if statement 
						sumOfNumber: {
							$gte: data.minCount,
							$lte: data.maxCount
						}
					}
				},
				{
					$project: {
						_id: 0
					}
				} // second $project is for wanted response 
			]).then(result => {
				resolve(result); // resolve try block
			}).catch(err => { // resolve catch block 
				reject(err);
			});
			// query end 
		});
	},
	single: async function (_id) {
		// some single functions are here 
		return new Promise(async (resolve, reject) => {
			// return async promises 
			// query start
			await UserModel.aggregate([

				{
					$match: {
						'_id': _id
					}
				},
				{
					$project: {
						_id: 0
					}
				} // second $project is for wanted response 
			]).then(result => {
				resolve(result); // resolve try block
			}).catch(err => { // resolve catch block 
				reject(err);
			});
			// query end 
		});
	},
	FindWithKey: async function (key, value) {
		// some single functions are here 
		return new Promise(async (resolve, reject) => {
			// return async promises 
			// query start
			await UserModel.findOne({ [key]: value }).then(result => {
				if (result) {
					resolve(result); // resolve try block
				} else {
					resolve(null);
				}

			}).catch(err => { // resolve catch block 
				reject(err);
			});
			// query end 
		});
	},
	delete: async function (_id) {
		console.log(_id);
		// some delete functions are here 
	},
	checkUserRole: async function (role,userId) {
		return new Promise(async(resolve,reject)=>{
			await UserModel.findOne({"_id":userId}).then(userInfo=>{
				if(userInfo.role==role){
					resolve(true);
				}else{
					resolve(false)
				}
			}).catch(err=>{
				reject(err);
			})
		})
	},
	update: async function (level, state, key, value, data) {
		// some update functions are here 
		// update level 1 set,push,inc,pull
		// update level 2 set,push,inc,pull
		// update level 3 set,push,inc,pull

		return new Promise(async (resolve, reject) => {
			switch (level) {
				case 0:
					switch (state) {
						case 'set':
							UserModel.updateOne({
								[key]: value
							},
								{ $set: data }
								, function (err, result) {
									if (err) {
										reject(err);
									} else {
										resolve(result);
									}
								});
							break;
					}
					break;
				case 'push':
					UserModel.updateOne({
						[key]: value
					},
						{ $push: data }
						, function (err, result) {
							if (err) {
								reject(err);
							} else {
								resolve(result);
							}
						});
					break;
				case 1:
					switch (state) {
						case 'push':
							UserModel.updateOne({
								[key]: value
							},
								{ $push: data }
								, function (err, result) {
									if (err) {
										reject(err);
									} else {
										resolve(result);
									}
								});
							break;
						case 'set':
							UserModel.updateOne({
								[data.place_name]: data.place_id
							},
								{ $set: data.datas }
								, function (err, result) {
									if (err) {
										reject(err);
									} else {
										resolve(result);
									}
								});

							break;
					}
					break;

			}



		});

	}

};