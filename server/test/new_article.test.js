const Nightmare = require('nightmare')
const chai = require('chai')
const expect = chai.expect
const should = chai.should()

const nightmare = Nightmare({
    // openDevTools: {
    // 	mode: 'detach'
    // },
    waitTimeout: 50000,
    gotoTimeout: 50000,
    loadTimeout: 50000,
    width: 1000,
    height: 600,
    typeInterval: 20,
    show: true
})

const URL = 'http://localhost:8080'

describe('Create new article', function() {
    this.timeout(30000)
    it('Expect to be post article', function(done) {
        nightmare
            .goto(`${URL}`)
            .click('#articlepanel')
            .wait(2000)
            .click('input#input_title')
            .type('input#input_title', 'Hello World !')
            .click('input#input_content')
            .type('input#input_content', 'This is Hello World Article!')
            .wait(1000)
            .click('#addArticleButton')
            .wait(5000)
            .click('#articlepanel')
            .wait(10000)
            .then(function() {
                done()
            })
            .catch(function(error) {
                console.error('Type post failed:', error)
            })
    })
    it('Expect to edit article automatically', function(done) {
        nightmare
            .click('#articlepanel')
            .wait(1000)
            .click('#buttonEditArticle')
            .wait(1000)
            .click('input#input_title')
            .type('input#input_title', '')
            .type('input#input_title', 'This Artice title was updated by nightmare ghost!')
            .click('input#input_content')
            .type('input#input_content', '')
            .type('input#input_content', 'This Article content was updated by nightmare ghost!')
            .wait(1000)
            .click('#newEditButton')
            .wait(1000)
            .click('#articlepanel')
            .wait(2000)
            .then(function() {
                done()
            })
            .catch(function(error) {
                console.error('Type post failed:', error)
            })
    })
    it('Expect to DELETE article automatically', function(done) {
        nightmare
            .click('#articlepanel')
            .wait(500)
            .click('#buttonDeleteArticle')
            .wait(500)
            .click('#articlepanel')
            .then(function() {
                done()
            })
            .catch(function(error) {
                console.error('Type post failed:', error)
            })
    })
})
