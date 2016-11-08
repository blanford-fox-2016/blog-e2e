var Nightmare = require('nightmare');
var chai = require('chai');
var expect = require('chai').expect; // jshint ignore:line
var chaiHttp = require('chai-http');

let cheerio = require('cheerio')

// $('h2.title').text('Hello there!')
// $('h2').addClass('welcome')
//
// $.html()

var nightmare = Nightmare({
  waitTimeout: 1000, // in ms
  width : 1000,
  height : 600,
  typeInterval : 20,
  show: true
});

chai.use(chaiHttp);

describe('test blogs', function() {

  this.timeout(10000)
  const $ = cheerio
  it('it should create new blog', function(done) {
    var nightmare = Nightmare()
    nightmare
      .goto('http://127.0.0.1:8080/blog.html')
      .type('input#blogID', '2')
      .type('input#title', 'There always be hope')
      .type('input#content', 'what you need to do is keep fight until the end')
      .click('input#addNewBlog')
      .wait(1000)
      .evaluate(function () {
        return document.$('#listOfBlog tr:last .title', document).text()// using cherrio
      })
      .then(function(link) {
        expect(link).to.equal('There always be hope');
        done();
      })
  });
});
