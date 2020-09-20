var assert = require('assert');
var express = require("../../app");
var request = require('supertest')(express);
var chai = require('chai');
var should = chai.should();


var token;
var bookId ;

// LOGIN + Register : 
describe("[#TC-1] Login", function() {
        // Login
        it("Admin should be able to login",() =>{
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

describe("[#TC-2] Admin Operations",() =>{

        //List Users
        it("Admin Rights - Should list all the Users",() =>{
            return request.get('/users')
            .set('Authorization','Bearer '+token)
            .expect(200)
            .then( res => {
                res.status.should.equal(200);
//                console.log(token);
            });
        });

        it("Admin Rights - Should be able to Insert Book", async () => {
            let book = {
                "name":"Alchemist",
                "label":"Short Novel",
                "price":"Rs. 500",
                "featured":true,
                "description":"Author : Paulo Coelho",
                "comments":[]
            }
            const res = await request
            .post('/books')
            .set('Authorization','Bearer '+token)
            .set('Content-Type','application/json')
            .send(book)
            .expect(200);

            bookId = res.body._id;
            console.log('BookID : '+bookId);
        });// Insert

        // Not able to update Book
        it("Admin Rights - Should Not be able to Update Book", (done) => {
            let book = {
                "name":"Alchemist Updated"
            }
            request.post('/books/'+bookId)
            .set('Authorization','Bearer '+token)
            .set('Content-Type','application/json')
            .send(book)
            //.expect(404)
            .then(res => {
                res.status.should.equal(403); 
                done();               
            })
        });// Update

        // Able to Create Book/Comment
        it("Admin Rights - Should be able to Create Book Review", () => {
            let comment = {
                    "rating":5,
                    "comment":"This is by Test by Admin"
            }
            return request.post('/books/'+bookId+'/comments')
            .set('Authorization','Bearer '+token)
            .set('Content-Type','application/json')
            .send(comment)
            .expect(200)
            .then(res => {
                res.status.should.equal(200);
                res.body.should.be.a('object');  
            })
        });// Create Comment
        

        it("Admin Rights - Should be able to delete the Book", () => {
            return request.delete('/books/'+bookId)
            .set('Authorization','Bearer '+token)
            .expect(200)
            .then( res => {
                res.status.should.equal(200);
            })
        }); // Delete

})
