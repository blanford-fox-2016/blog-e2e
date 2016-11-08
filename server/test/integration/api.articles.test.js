
const chai = require('chai')
const assert = chai.assert
const chaiHTTP = require('chai-http')
chai.use(chaiHTTP)
const should = chai.should()

const url = 'http://localhost:5000'

/*
  * will test GET /api/users
  * should return (200) status code
  ** must be in format JSON
*/
describe('Get all articles from database', function(){
  /*
    * dummy data
  */
  beforeEach(function(done){
      chai.request(url)
        .post('/api/articles')
        .send({
          "articleId" : 1,
          "content" : "dummy data"
        })
        .end(function(err, res){
          console.log(res.body);
          done()
        })
  })

  it('it should return all articles from database', function(done){
    chai.request(url)
      .get('/api/articles')
      .end(function(err, res){
        console.log(res.body);
        res.body[0].should.have.property('_id')
        res.body[0].should.have.property('articleId')
        res.body[0].should.have.property('content')
        res.body[0].should.have.property('createdAt')
        res.body[0].should.have.property('updatedAt')
        res.should.be.json
        res.should.have.status(200)
        done()
      })
  })
})

/*
  * will test POST /api/articles
  * should return (200) status code
  ** must be in format JSON
  ** respond content body should be same with the content value that sent (POST)
*/
describe('Add a new article into database', function(){
  it('it should add new article', function(done){
    chai.request(url)
      .post('/api/articles')
      .send({
        "articleId" : 123,
        "content" : "new content from testing"
      })
      .end(function(err, res){
        res.should.be.json
        res.should.have.status(200)
        res.body.content.should.equal("new content from testing")
        done()
      })
  })
})

/*
  * will test PUT /api/articles/:id
  * should return (200) status code
  ** must be in format JSON
  ** respond content body should be same with the content value that sent (PUT)
*/
describe('Updated a specific article based on articleId', function(){
  it('it should update a specific article', function(done){
    chai.request(url)
      .put('/api/articles/' + 1)
      .send({
        "content" : "edit content from testing"
      })
      .end(function(err, res){
        res.should.be.json
        res.should.have.status(200)
        res.body.content.should.equal("edit content from testing")
        done()
      })
  })
})

/*
  * will test DELETE /api/articles
  * should return (200) status code
  ** must be in format JSON
  ** respond content body should be same with the content value that deleted (DELETE)
*/
describe('Deleted a specific article based on articleId', function(){
  it('it should delete a specific article', function(done){
    chai.request(url)
      .delete('/api/articles/' + 1)
      .end(function(err, res){
        res.should.be.json
        res.should.have.status(200)
        res.body.articleId.should.equal(1)
        done()
      })
  })
})
