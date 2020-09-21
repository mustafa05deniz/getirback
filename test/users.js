const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);
const server = require("../server");

describe("Login", () => {
    it("POST: users/login", done => {
        chai.request(server)
            .post("/users/login")
            .set("Content-Type", "application/json")
            .send({
                "phone": "05396827024",
                "password": "123456789",
            })
            .end((error, response) => {
                response.body.should.be.a("object");
                response.body.should.have.keys('code','msg','data');
                response.body.should.be.property("code").to.equal(0);
                done()
            })
    }).timeout(6000);



});

describe("Register", () => {
    it("POST: records", done => {
        chai.request(server)
            .post("/users/register")
            .set("Content-Type", "application/json")
            .send({
                "phone": "05396827024",
                "password": "123456789",
                "name":"mustafa"
            })
            .end((error, response) => {
                response.body.should.be.a("object");
            
                done()
            })
    }).timeout(6000);



});

