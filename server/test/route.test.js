'use strict'
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect
const urlApi = 'http://localhost:3000/api'
chai.use(chaiHttp);

// CRUD ROUTE TEST
describe.skip('Route get article', function() {
    it('expect to return list of articles', function(done) {
            chai.request(urlApi)
                .get('/article')
                .end(function(err, res) {
                    expect(res).to.have.status(200)
                    expect(res).to.be.json
                    expect(res.body[0].content).to.be.equal("nodejs mastery")
                    done()
                }) // chai
        }) // it
})

describe.skip('Route post article', function() {
    let newTitle = 'express mastery'
    let newContent = 'express mastery adalah .....'
    it('expect to return json of new user and status 200', function(done) {
        chai.request(urlApi)
            .post('/article')
            .send({
                title: newTitle,
                content: newContent
            })
            .end(function(req, res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body.title).to.be.equal(newTitle)
                done()
            })
    })
})

describe.skip('Route put article', function() {
        let putId = `58204381145c6e5893590e77`
        let newTitle = `NodeJs Mastery`
        let newContent = `NodeJs adalah .....`
        it('expect to return json of ok:1 and status 200', function(done) {
            chai.request(urlApi)
                .put(`/article/${putId}`)
                .send({
                    title: newTitle,
                    content: newContent
                })
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body.ok).to.be.equal(1)
                    done()
                })
        })
    })
    //
describe.skip('Route delete article', function() {
    let delId = `5820492f467df265eb89c878`
    it('expect to return json of n:1 and status 200', function(done) {
        chai.request(urlApi)
            .delete(`/article/${delId}`)
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body.n).to.be.equal(1)
                done()
            })
    })
})

// REGISTER NEW USER
describe.skip('Route post Register new User', function() {
    let newName
    let newUsername
    let newPassword
    it('expect to return new user name and status 200', function(done) {
        chai.request(urlApi)
            .post('/register')
            .send({
                name: newName,
                username: newUsername,
                password: newPassword
            })
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body[0].name).to.be.equal(newName)
                done()
            })
    })
})

describe.skip('Route Login Process', function() {
    let newUsername = `aaaa`
    let newPassword = `aaaa`
    it('expect username from login = username from database', function(done) {
        chai.request(urlApi)
            .post('/login')
            .send({
                username: newUsername,
                password: newPassword
            })
            .end(function(req, res) {
                expect(res.body.username).to.be.equal(newUsername)
                done()
            })
    })
})
