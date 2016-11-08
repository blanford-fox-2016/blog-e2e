const app = require('../../app')
const cheerio = require('cheerio')
const mongoose = require('mongoose')
const User = require('../../models/user')

var Nightmare = require('nightmare');
const mocha = require('mocha')
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect

const nightmare = Nightmare({
  // openDevTools: {
  // 	mode: 'detach'
  // },
  // waitTimeout: 50000,
  // gotoTimeout: 50000,
  // loadTimeout: 50000,
  width: 1000,
  height: 600,
  typeInterval: 20,
  show: true
})

chai.use(chaiHttp)

before(function (done) {
  chai.request('http://localhost:3000')
    .get('/api/user/seed')
    .end(function (err, res) {
      console.log("seeded")
      done()
    })
})

after(function (done) {
  chai.request(app)
    .delete('/api/user/delete')
    .end(function (err, res) {
      console.log("deleted")
      done()
    })
})

//USER
describe("Test if Users works", function () {

  this.timeout(3000)
  const $ = cheerio

  it("expect to return list of users", function (done) {
    nightmare
      .goto('http://localhost:8080')
      .wait(1000)
      .evaluate(function () {
        let val = $('#rowOfUser tr:first td:first', document)
        return val.text()
      })
      .then(function (name) {
        expect(name).to.equal("name a")
        done()
      })
      .catch(function (error) {
        console.error('Error:', error)
      })
  })

})

describe("Test if Users submission works", function () {

    this.timeout(10000)

    it("Return true if register user works", function (done) {
        nightmare
            .goto('http://localhost:8080')
            .wait(1000)
            .type('input#inputName', 'name z')
            .type('input#inputUsername', 'username z')
            .type('input#inputPassword', 'password z')
            .type('input#inputEmail', 'zzz@gmail.com')
            .wait(1000)
            .click('#inputSubmit')
            .wait(1000)
            .evaluate(function () {
                let val = $('#rowOfUser tr:last td:first', document)
                return val.text()
            })
            .then(function (name) {
                expect(name).to.equal("name z")
                done()
            })
            .catch(function (error) {
                console.error('Error:', error)
            })
    })

    it("Return true if delete blog works", function (done) {
        nightmare
            .goto('http://localhost:8080')
            .click('data-id')
            .wait(1000)
            .evaluate(function () {
                let val = $('#rowOfUser tr:last td:first', document)
                return val.text()
            })
            .then(function (name) {
                expect(name).to.equal("name z")
                done()
            })
            .catch(function (error) {
                console.error('Error:', error)
            })
    })

    it.skip("Return true if update blog works", function (done) {
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
  this.timeout(5000)
})


// describe("Test if register user works", function () {
//     beforeEach(function (done) {
//         chai.request(app)
//             .get('/api/user/seed')
//             .end(function (err, res) {
//                 console.log("seeded")
//                 done()
//             })
//     })
//
//     afterEach(function (done) {
//         chai.request(app)
//             .delete('/api/user/delete')
//             .end(function (err, res) {
//                 done()
//             })
//     })
//
//     it("expect to return list of all users", function (done) {
//         chai.request(app)
//             .get('/api/user')
//             .end(function (err, res) {
//                 console.log(res.body[0])
//                 expect(res).to.have.status(200)
//                 expect(res.body[0].name).to.equal('name a')
//                 expect(res.body[0].username).to.equal('username a')
//                 expect(res.body[0].password).to.equal('password a')
//                 expect(res.body[0].email).to.equal('aaa@gmail.com')
//                 done()
//             })
//     })
//
//     it("Return true if create user works", function (done) {
//         chai.request(app)
//             .post('/api/register')
//             .send({
//                 userId: '3',
//                 name: 'name c',
//                 username: 'username c',
//                 password: 'password c',
//                 email: 'ccc@gmail.com'
//             })
//             .end(function (err, res) {
//                 expect(res).to.have.status(200)
//                 expect(res.body.name).to.equal('name c')
//                 expect(res.body.username).to.equal('username c')
//                 expect(res.body.email).to.equal('ccc@gmail.com')
//                 done()
//             })
//     })
//
//     it("Return true if delete user works", function (done) {
//         chai.request(app)
//             .delete('/api/user/delete/1')
//             .end(function (err, res) {
//                 expect(res).to.have.status(200)
//                 expect(res.body.name).to.equal('name a')
//                 expect(res.body.username).to.equal('username a')
//                 expect(res.body.password).to.equal('password a')
//                 expect(res.body.email).to.equal('aaa@gmail.com')
//                 done()
//             })
//     })
//
//     it("Return true if update user works", function (done) {
//         chai.request(app)
//             .put('/api/user/update/1')
//             .send({
//                 userId: '3',
//                 name: 'name c',
//                 username: 'username c',
//                 password: 'password c',
//                 email: 'ccc@gmail.com'
//             })
//             .end(function (err, res) {
//                 expect(res).to.have.status(200)
//                 expect(res.body.name).to.equal('name c')
//                 expect(res.body.username).to.equal('username c')
//                 expect(res.body.password).to.equal('password c')
//                 expect(res.body.email).to.equal('ccc@gmail.com')
//                 done()
//             })
//     })
//
//     it("expect to return user can login", function (done) {
//         chai.request(app)
//             .post('/api/login')
//             .send({
//                 username: 'username a',
//                 password: 'password a',
//             })
//             .end(function (err, res) {
//                 expect(res).to.have.status(200)
//                 expect(res.body.name).to.equal('name a')
//                 expect(res.body.username).to.equal('username a')
//                 expect(res.body.password).to.equal('password a')
//                 expect(res.body.email).to.equal('aaa@gmail.com')
//                 done()
//             })
//     })
// })
