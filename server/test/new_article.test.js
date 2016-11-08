const Nightmare = require('nightmare')
const chai = require('chai')
const cheerio = require('cheerio')
const $ = cheerio
const expect = chai.expect
const should = chai.should()
const nightmare = Nightmare({
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
    it('Expect to be post article and return title&content of the article', function(done) {
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
            .wait(1000)
            .click('#articlepanel')
            .wait(1000)
            .evaluate(function() {
                let article_title = $('#rowItem1 td:first', document).text()
                let article_content = $('#rowItem1 td:nth-child(2)', document).text()
                let panel = {
                    title: article_title,
                    content: article_content
                }
                return panel
            })
            .then(function(data) {
                expect(data.title).to.equal('Hello World !')
                expect(data.content).to.equal('This is Hello World Article!')
                done()
            })
            .catch(function(error) {
                console.error('Type post failed:', error)
            })
    })
    it('Expect to edit article automatically', function(done) {
        nightmare
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
            .evaluate(function() {
                loadArticle()
                let article_title = $('#rowItem1 td:first', document).text()
                let article_content = $('#rowItem1 td:nth-child(2)', document).text()
                let panel = {
                    title: article_title,
                    content: article_content
                }
                return panel

            })
            .then(function(data) {
                expect(data.title).to.equal('This Artice title was updated by nightmare ghost!')
                expect(data.content).to.equal('This Article content was updated by nightmare ghost!')
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
            .click('#modalDelButton')
            .wait(1000)
            .click('#buttonDeleteArticle')
            .wait(1000)
            .evaluate(function() {
                loadArticle()
            })
            .wait(1000)
            .then(function() {
                let article_count = $('#rowItem1').length
                expect(article_count).to.equal(0)
                done()
            })
            .catch(function(error) {
                console.error('Type post failed:', error)
            })
    })
})
