
const RecordModel = require('../model/record');

module.exports = {

    push: async function (data) {
        // some push functions are here 
    },
    list: async function () {
        // some list functions are here 
    },
    filter: async function (data) {
        return new Promise(async (resolve, reject) => {
            // return async promises 
            // query start
            await RecordModel.aggregate([
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
            })
            // query end 
        })
    },
    single: async function (_id) {
        // some single functions are here 
    },
    delete: async function (_id) {
        // some delete functions are here 
    },
    update: async function (_id, data) {
        // some update functions are here 
        // update level 1 set,push,inc,pull
        // update level 2 set,push,inc,pull
        // update level 3 set,push,inc,pull
    },

}

