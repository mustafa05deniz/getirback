const ticketModel = require('../model/ticket');

module.exports = {

	push: async function (data) {
		// some push functions are here 
		new Promise(function () {
			return ticketModel.create(data).then(result => {
				return result; // resolve try block
			}).catch(err => { // resolve catch block 
				throw new Error(err);
			});
		});
	},
	list: async function () {
		// some list functions are here 
		return new Promise(async (resolve, reject) => {
			// return async promises 
			// query start
			await ticketModel.find().then(result => {
				resolve(result); // resolve try block
			}).catch(err => { // resolve catch block 
				reject(err);
			});
			// query end 
		});
	},
	filter: async function (query) {
		console.log(query);
		return new Promise(async (resolve, reject) => {
			var queryList = [];
			query.filter.status ? queryList.push({"status":parseInt(query.filter.status)}):null;
			query.filter.email ? queryList.push({"userEmail":parseInt(query.filter.email)}):null;
			query.filter.title ? queryList.push({"title":parseInt(query.filter.title)}):null;
			console.log(queryList);
			await ticketModel.aggregate([
				{
					$match:{$or:queryList}
					
				},
			], function (err, row) {
				if (err) {
					reject(err);
				} else {
					resolve(row);
				}
			})
		})
	},
	single: async function (_id) {
		// some single functions are here 
		return new Promise(async (resolve, reject) => {
			// return async promises 
			// query start
			await ticketModel.aggregate([

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
	FindOneWithKey: async function (key, value) {
		// some single functions are here 
		return new Promise(async (resolve, reject) => {
			// return async promises 
			// query start
			await ticketModel.findOne({ [key]: value }).then(result => {
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
	FindAllWithKey: async function (key, value) {
		// some single functions are here 
		return new Promise(async (resolve, reject) => {
			// return async promises 
			// query start
			await ticketModel.find({ [key]: value }).then(result => {
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
	deleteWithNestedArray: async function (key, value, nestedArray, key2, value2) {
		console.log(key, value, nestedArray, key2, value2)
		return new Promise(async (resolve, reject) => {
			ticketModel.updateOne({
				[key]: value
			},
				{ $pull: { [nestedArray]: { [key2]: value2 } } }
				, function (err, result) {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				});
		})

	},
	update: async function (level, state, key, value, data, key2, value2) {
		// some update functions are here 
		// update level 1 set,push,inc,pull
		// update level 2 set,push,inc,pull
		// update level 3 set,push,inc,pull

		return new Promise(async (resolve, reject) => {
			switch (level) {
				case 0:
					switch (state) {
						case 'set':
							ticketModel.updateOne({
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
						case 'push':

							ticketModel.updateOne({
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

					}
					break;
				case 1:
					switch (state) {
						case 'push':
							ticketModel.updateOne({
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
							ticketModel.updateOne({
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