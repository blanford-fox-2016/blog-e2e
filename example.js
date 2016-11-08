var Nightmare = require('nightmare');
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
  .end()
  .then(function (result) {
    console.log(result)
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });
