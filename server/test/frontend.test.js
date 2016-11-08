var Nightmare = require('nightmare');
var expect = require('chai').expect; // jshint ignore:line
//
describe('add new article', function() {

  this.timeout(10000)

  // cont $ = cheerio
  it('should store new article to database with the title "boo"', function(done) {
    var nightmare = Nightmare({ show: true });
    nightmare
      .goto('http://localhost:8080')
      .wait('[name=add]')
      .click('[name=add]')
      .click('form#inputArticles #articleTitle')
      .type('form#inputArticles #articleTitle', 'boo')
      .click('form#inputArticles #articleContent')
      .type('form#inputArticles #articleContent', 'There is a ghost who knows how to use computer, awesome!')
      .click('form#inputArticles #articleCategory')
      .type('form#inputArticles #articleCategory', 'mistery')
      .click('form#inputArticles [name=submit]')
      .wait('.col-sm-6.col-md-4')
      .evaluate(function () {
        return document.querySelector('.thumbnail .caption h3').innerHTML
      })
      .end()
      .then(function(result) {
        expect(result).to.equal('boo');
        done();
      })
  });
});

describe('edit article', function() {

  this.timeout(60000)

  // cont $ = cheerio
  it('should change the title from "boo" to "Trick or Treat"', function(done) {
    var nightmare = Nightmare({ show: true });
    nightmare
      .goto('http://localhost:8080')
      .wait('#articles .col-sm-6.col-md-4')
      .click('p.text-center button.btn.btn-primary')
      .click('.edt')
      .wait(1000)
      .click('.arcTitle')
      .insert('.arcTitle', '')
      .type('.arcTitle', 'Trick or Treat')
      .wait(1000)
      .click('.arcContent')
      .insert('.arcContent', '')
      .type('.arcContent', 'Gimme some candies')
      .wait(1000)
      .click('.arcCategory')
      .insert('.arcCategory', '')
      .type('.arcCategory', 'halloween')
      .wait(1000)
      .click('.edt')
      .wait(1000)
      .evaluate(function () {
        return document.querySelector('.thumbnail .caption h3').innerHTML
      })
      .end()
      .then(function(result) {
        expect(result).to.equal('Trick or Treat');
        done();
      })
  });
});


describe('delete article', function() {

  this.timeout(10000)

  // cont $ = cheerio
  it('should delete the article', function(done) {
    var nightmare = Nightmare({ show: true });
    nightmare
      .goto('http://localhost:8080')
      .wait('#articles .col-sm-6.col-md-4')
      .wait(1000)
      .click('p.text-center button.btn.btn-danger')
      .wait(1000)
      .click('.delt')
      .wait('#dltd')
      .evaluate(function () {
        return document.querySelector('#dltd').innerHTML
      })
      .end()
      .then(function(result) {
        console.log(result);
        expect(result).to.equal('success');
        done();
      })
  });
});
