'use strict'


const mocha = require('mocha')
const chai = require('chai')
const expect = chai.expect
const should = chai.should()
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

// local dipendencies
const url = 'http://localhost:3000'
const User = require('../models/user.server.model')
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


describe('Blogs', () => {
    describe('/GET users', () => {
        //this.timeout(5000)
        it('it should GET empty users', (done) => {
            chai.request(url)
                .get('/api/users')
                .end((err, res) => {
                    //expect(res).to.have.status(200)
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    //console.log(res.body);
                    res.body.length.should.be.eql(0)
                    done()
                })
        })
    })

    // post new user
    describe('/post users', () => {
        it('it should GET empty users', (done) => {
            chai.request(url)
                .post('/api/users')
                .send({
                  username : 'Juang',
                  name : 'Bagus Juang',
                  password : 'antaraAdaDanTiada'
                })
                .end((err, res) => {
                  res.should.have.status(200)
                  res.body.should.be.a('object')
                  res.body.should.have.property('username')
                  res.body.should.have.property('name')
                  res.body.should.have.property('password')
                  done()
                })
              })
        })

    // update new user
    describe('/put users', () => {
        it('it should GET empty users', (done) => {
            chai.request(url)
                .put('/api/users/Juang')
                .send({
                  name : 'Panglima'
                })
                .end((err, res) => {
                  //console.log(res.body);
                  res.should.have.status(200)
                  res.body.should.be.a('object')
                  res.body.should.have.property('username')
                  res.body.should.have.property('name')
                  res.body.should.have.property('password')
                  done()
                })
              })
        })

        // delte new user
        describe('/put users', () => {
            it('it should GET empty users', (done) => {
                chai.request(url)
                    .delete('/api/users/Juang')
                    .end((err, res) => {
                      console.log(res.body);
                      res.should.have.status(200)
                      //res.body.length.should.be.eql(0)
                      done()
                    })
                  })
            })
  })
