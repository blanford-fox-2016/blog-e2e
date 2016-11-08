'use strict'
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const should = chai.should();
const article = require('../models/articles');

// describe('empty the database collection', () => {
//   beforeEach((done) => { //Before each test we empty the database
//       article.remove({}, (err) => {
//          done();
//       });
//   });
// })

describe('post new article', function() {
  it('should store a new article to the database, and return the data back', function(done) {
    chai.request('http://localhost:3000')
      .post('/api/article')
      .send({
        title: 'Hello World!',
        content: 'Hello World! Lorem ipsum dolor sit amet',
        category: 'Tutorial',
        slug: 'hello-world'
      })
      .end( function (err, res) {
        res.should.be.json;
        res.should.have.status(200);
        res.body.title.should.equal('Hello World!');
        res.body.content.should.equal('Hello World! Lorem ipsum dolor sit amet');
        res.body.category.should.equal('Tutorial');
        res.body.slug.should.equal('hello-world');
        done();
      })
  })
})

//Test script for get article lists
describe('article list', function() {
  it('should return the respond json which contains the list of articles from database', function(done) {
    chai.request('http://localhost:3000')
      .get('/api/article')
      .end(function (err, res) {
        res.should.be.json;
        res.should.have.status(200);
        done();
      })
  })
})

//get single article by slug
describe('get single article by slug', function() {
  let slug = 'hello-world';
  it('should return a single article based on slug', function(done) {
    chai.request('http://localhost:3000')
    .get('/api/article/'+slug)
    .end(function (err, res) {
      res.should.be.json;
      res.should.have.status(200);
      res.body.slug.should.equal('hello-world');
      done();
    })
  })
})

//update single article by id
describe('find by slug, get the id, then update', function() {
  let slug = 'hello-world';
  it('should return status ok 1, nModified 1, modified 1', function(done) {
    chai.request('http://localhost:3000')
      .get('/api/article/'+slug)
      .end(function (err, res) {
        console.log(res.body._id);
        chai.request('http://localhost:3000')
          .put('/api/article/'+res.body._id)
          .send({
            title: 'Hello World! Lalala',
            content: 'Hello World! Lorem ipsum dolor sit amet Lalala',
            category: 'Tutorial',
            slug: 'hello-world'
          })
          .end(function (err, res){
            res.should.be.json;
            res.should.have.status(200);
            res.body.ok.should.equal(1);
            res.body.nModified.should.equal(1);
            res.body.n.should.equal(1);
            done();
          });

      })
  })
})

//delete single article by id
describe('find by slug, get the id, then delete', function() {
  let slug = 'hello-world';
  it('should return status ok 1, n 1', function(done) {
    chai.request('http://localhost:3000')
      .get('/api/article/'+slug)
      .end(function (err, res) {
        chai.request('http://localhost:3000')
          .delete('/api/article/'+res.body._id)
          .end(function (err, res){
            res.should.be.json;
            res.should.have.status(200);
            res.body.ok.should.equal(1);
            res.body.n.should.equal(1);
            done();
          })
      })
  })
})
