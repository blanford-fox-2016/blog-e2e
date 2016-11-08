var Nightmare = require('nightmare');
var chai = require('chai');
var expect = require('chai').expect; // jshint ignore:line
var chaiHttp = require('chai-http');

let cheerio = require('cheerio') // need req cheerio for convert

// $('h2.title').text('Hello there!')
// $('h2').addClass('welcome')
//
// $.html()

var nightmare = Nightmare({
  waitTimeout: 50000, // in ms
  width : 1000,
  height : 600,
  typeInterval : 20,
  show: true
});

chai.use(chaiHttp);

describe('Test CRUD Blogs', function() {
  // set time out for test
  this.timeout(500000)
  // convert js to tag html
  const $ = cheerio

  // it('it should create new blog', function(done) {
  //
  //     nightmare // req nightmare
  //     .goto('http://127.0.0.1:8080/blog.html')
  //     .type('input#blogID', '2')
  //     .wait(1000)
  //     .type('input#title', 'There always be hope')
  //     .wait(1000)
  //     .type('textarea#content', 'what you need to do is keep fight until the end')
  //     .wait(1000)
  //     .click('#addNewBlog')
  //     .wait(1000)
  //     .evaluate(function () {
  //       let val = $('#listOfBlog tr:last .title', document).text()// using cherrio
  //       return val
  //     })
  //     .then(function(data) {
  //       // console.log(">>>>>", data);
  //       expect(data).to.equal('There always be hope');
  //       done();
  //     })
  //     .catch(function(err) {
  //       console.log(err);
  //     })
  // });

  it('it should delete the last blog', function(done) {

      nightmare // req nightmare

      .goto('http://127.0.0.1:8080/blog.html')
      .wait(1000)
      // select the button deletes
      // $('#listOfBlog tr:last button')[1]
      .click('#listOfBlog tr:last .btn-danger')
      .evaluate(function () {
        // let val = $('#listOfBlog tr:last .title', document).text() // using cherrio
        // return val
      })
      .then(function() {
        // console.log(">>>>>", data);
        // expect(data).to.equal('There always be hope');
        done();
      })
      .catch(function(err) {
        console.log(err);
      })
  });

  // it('it should edit the last blog', function(done) {
  //
  //     nightmare // req nightmare
  //
  //     .goto('http://127.0.0.1:8080/blog.html')
  //     .wait(1000)
  //     .click('#edit1')
  //     .type('input#title', 'There always be hope 2')
  //     .wait(1000)
  //     .type('textarea#content', 'what you need to do is keep fight until the end 2')
  //     .wait(1000)
  //     .click('#updateButton')
  //     .evaluate(function () {
  //       // let val = $('#listOfBlog tr:last .title', document).text() // using cherrio
  //       // return val
  //     })
  //     .then(function() {
  //       // console.log(">>>>>", data);
  //       // expect(data).to.equal('There always be hope');
  //       done();
  //     })
  //     .catch(function(err) {
  //       console.log(err);
  //     })
  // });



});
