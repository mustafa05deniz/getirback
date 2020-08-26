
const recordFunction = require('../functions/record');
const response = require('../_helpers/response');	

module.exports = {

	records:async function(req, res, next) {
		const data = {
            "startDate":req.body.startDate,
            "endDate":req.body.endDate,
            "minCount":req.body.minCount,
            "maxCount":req.body.maxCount
        }
        await recordFunction.filter(data).then(result=>{
            response.successResponse(res,"succesfuly",'records',result)
        }).catch(err=>{
            response.ErrorResponse(res,"records filter error is : "+err)
        })
	},
	
}					
