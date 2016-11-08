'use strict'

const mocha = require('mocha')
const app = require('../app')
const chai = require('chai')
const chaiHttp = require('chai-http')
const assert = chai.assert
const expect = chai.expect
const should = chai.should()
const mongoose = require('mongoose');
const Blog = require('../models/blog');
const server = require('../app');


chai.use(chaiHttp)


/*
clear data base
add new dataa base
*/



describe('endpoint', function() {
  // this.timeout(5000);
  before(function(){
    Blog.remove({},function(err){});
  })

  it('create new blog ', function(done) {
    chai.request(server)
    .post('/api/blog')
    .send({
      title: 'apa',
      content:"ituu",
      postId:"125"
    })
    .end(function(err, res) {
      console.log(res.body[0]);
      res.body.should.have.property('_id')
      res.body.title.should.equal('apa')
      expect(res).to.have.status(200)
      expect(res).to.be.json
      done()
    })
  })

  it('show all blog', function(done) {
    // console.log("ini"+server);
    chai.request('http://localhost:3000')
    .get('/api/blog')
    .end(function(err, res) {

      // console.log(res.body);
      // res.body[0].should.have.property('_id')
      res.body[0].should.have.property('postId')
      res.body[0].should.have.property('title')
      res.body[0].should.have.property('content')
      expect(res).to.have.status(200)
      expect(res).to.be.json
      done()
    })
  })

  it('should update blog by id', function(done) {
    chai.request('http://localhost:3000')
    .get('/api/blog')
    .end(function(err,res) {
      console.log('/api/blog/'+res.body[0].postId);
      chai.request('http://localhost:3000')
      .put('/api/blog/'+res.body[0].postId)
      .send({title:"ganti"})
      .end(function(err,response){
        console.log(response.body);
        response.body.should.have.property('nModified')
        response.body.nModified.should.equal(1);
        done()
      })
      })
  })

  it('delete blog by id', function(done) {
    chai.request(server)
    .get('/api/blog')
    .end(function(err,res){
      chai.request(server)
      .delete('/api/blog/'+res.body[0]._id)
      .end(function(err,response){
        console.log(response.body);
          response.body.message.should.equal("User delete")
          done()
      })
    })
  })


})
