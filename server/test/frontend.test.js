var Nightmare = require('nightmare');
var expect = require('chai').expect; // jshint ignore:line
//
describe.skip('add new article', function() {

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
