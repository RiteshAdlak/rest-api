var assert = require('assert');
var express = require("../../app");
var request = require('supertest')(express);
var chai = require('chai');
var should = chai.should();

var token;

describe("[#TC-1] Registration + Login", function() {

        // Register
        it("Should Register an User/Admin",() => {
            return request.post('/users/signup')
            .set('Content-Type','application/json')
            .send({"username":"admin", "password":"admin"})
            .expect(200)
            .then(res => {
                //console.log(res);
                res.body.success.should.be.true;
            });
            //done();
    });

        // Login
        it("User/Admin should be able to login",() =>{
            return request.post('/users/login')
            .set('Content-Type','application/json')
            .send({"username":"admin", "password":"admin"})
            .expect(200)
            .then( res => {
                res.body.success.should.be.true;
                res.status.should.equal(200);
                res.body.token.should.not.be.empty;
                token = res.body.token;
            });
            //done();
        });
});
