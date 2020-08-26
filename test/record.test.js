const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);
const server = require("../server");

describe("Records Filtered Data", () => {

    it("POST: records", done => {
        chai.request(server)
            .post("/records/filteredRecords")
            .set("Content-Type", "application/json")
            .send({
                "startDate": "2016-01-26",
                "endDate": "2018-02-02",
                "minCount": 2700,
                "maxCount": 3000
            })
            .end((error, response) => {
                response.body.should.be.a("object");
                response.body.should.have.keys('code','msg','records');
                response.body.should.be.property("code").to.equal(0);
                done()
            })
    }).timeout(6000);



});