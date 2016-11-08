const app = require('../app')
const mongoose = require('mongoose')
const User = require('../models/user')

const mocha = require('mocha')
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect

chai.use(chaiHttp)

//BLOG
describe("Test if create Blog works", function () {

    beforeEach(function (done) {
        chai.request(app)
            .get('/api/blog/seed')
            .end(function (err, res) {
                // console.log("seeded")
                done()
            })
    })

    afterEach(function (done) {
        chai.request(app)
            .delete('/api/blog/delete')
            .end(function (err, res) {
                done()
            })
    })

    it("expect to return list of blog posts", function (done) {
        chai.request(app)
            .get('/api/blog')
            .end(function (err, res) {
                // console.log(res.body)
                expect(res).to.have.status(200)
                expect(res.body[0].title).to.equal('title a')
                expect(res.body[0].description).to.equal('description a')
                done()
            })
    })

    it("Return true if create blog works", function (done) {
        chai.request(app)
            .post('/api/blog/create')
            .send({
                postId: '6',
                title: 'title create',
                description: 'description create'
            })
            .end(function (err, res) {
                expect(res).to.have.status(200)
                expect(res.body.title).to.equal('title create')
                expect(res.body.description).to.equal('description create')
                done()
            })
    })

    it("Return true if delete blog works", function (done) {
        chai.request(app)
            .delete('/api/blog/delete/1')
            .end(function (err, res) {
                expect(res).to.have.status(200)
                expect(res.body.title).to.equal('title a')
                expect(res.body.description).to.equal('description a')
                done()
            })
    })

    it("Return true if update blog works", function (done) {
        chai.request(app)
            .put('/api/blog/update/1')
            .send({
                postId: '7',
                title: 'title update',
                description: 'description update'
            })
            .end(function (err, res) {
                expect(res).to.have.status(200)
                expect(res.body.title).to.equal('title update')
                expect(res.body.description).to.equal('description update')
                done()
            })
    })
})

//USER
describe("Test if register user works", function () {
    beforeEach(function (done) {
        chai.request(app)
            .get('/api/user/seed')
            .end(function (err, res) {
                console.log("seeded")
                done()
            })
    })

    afterEach(function (done) {
        chai.request(app)
            .delete('/api/user/delete')
            .end(function (err, res) {
                done()
            })
    })

    it("expect to return list of all users", function (done) {
        chai.request(app)
            .get('/api/user')
            .end(function (err, res) {
                console.log(res.body[0])
                expect(res).to.have.status(200)
                expect(res.body[0].name).to.equal('name a')
                expect(res.body[0].username).to.equal('username a')
                expect(res.body[0].password).to.equal('password a')
                expect(res.body[0].email).to.equal('aaa@gmail.com')
                done()
            })
    })

    it("Return true if create user works", function (done) {
        chai.request(app)
            .post('/api/register')
            .send({
                userId: '3',
                name: 'name c',
                username: 'username c',
                password: 'password c',
                email: 'ccc@gmail.com'
            })
            .end(function (err, res) {
                expect(res).to.have.status(200)
                expect(res.body.name).to.equal('name c')
                expect(res.body.username).to.equal('username c')
                expect(res.body.email).to.equal('ccc@gmail.com')
                done()
            })
    })

    it("Return true if delete user works", function (done) {
        chai.request(app)
            .delete('/api/user/delete/1')
            .end(function (err, res) {
                expect(res).to.have.status(200)
                expect(res.body.name).to.equal('name a')
                expect(res.body.username).to.equal('username a')
                expect(res.body.password).to.equal('password a')
                expect(res.body.email).to.equal('aaa@gmail.com')
                done()
            })
    })

    it("Return true if update user works", function (done) {
        chai.request(app)
            .put('/api/user/update/1')
            .send({
                userId: '3',
                name: 'name c',
                username: 'username c',
                password: 'password c',
                email: 'ccc@gmail.com'
            })
            .end(function (err, res) {
                expect(res).to.have.status(200)
                expect(res.body.name).to.equal('name c')
                expect(res.body.username).to.equal('username c')
                expect(res.body.password).to.equal('password c')
                expect(res.body.email).to.equal('ccc@gmail.com')
                done()
            })
    })

    it("expect to return user can login", function (done) {
        chai.request(app)
            .post('/api/login')
            .send({
                username: 'username a',
                password: 'password a',
            })
            .end(function (err, res) {
                expect(res).to.have.status(200)
                expect(res.body.name).to.equal('name a')
                expect(res.body.username).to.equal('username a')
                expect(res.body.password).to.equal('password a')
                expect(res.body.email).to.equal('aaa@gmail.com')
                done()
            })
    })
})