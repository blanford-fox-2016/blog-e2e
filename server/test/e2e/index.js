const Nightmare = require('nightmare')

const chai = require('chai')

const chaiHTTP = require('chai-http')

chai.use(chaiHTTP)

const expect = chai.expect

const should = chai.should()

const cheerio = require('cheerio')
const $ = cheerio

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

/* client URL */
const URL = 'http://localhost:8080'

// Seeder
before(function(done){
	chai.request('http://localhost:5000')
		.post('/api/articles/seed')
		.end(function(err, res){
			done()
		})
})

// delete All
after(function(done){
	chai.request('http://localhost:5000')
		.delete('/api/articles/seed')
		.end(function(err, res){
			done()
		})
})

describe('Create new article', function(){
  this.timeout(15000)


  it('expect to able create new article', function(done){
    nightmare
      .goto(`${URL}`)
			.type(`input#title`, 'new title from test e2e')
      .type(`textarea#content`, 'new article content from test e2e : Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
      .click(`button#btn_add`)
			.wait(1000)
			.evaluate(function(){
				// return document.querySelector('#body_table tr:first').innerHTML
				let articleId = $('#body_table tr:first td:first', document).text()
				let title = $('#body_table tr:first td:nth-child(2)', document).text()
				let content = $('#body_table tr:first td:nth-child(3)', document).text()

				let result = {
					"articleId" : articleId,
					"title"			: title,
					"content"		: content
				}
				return result
			})
      .then(function(new_data){
				// console.log('----',new_data);
				expect(new_data.articleId).to.equal('10')
				expect(new_data.title).to.equal('new title from test e2e')
				expect(new_data.content).to.equal('new article content from test e2e : Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
        done()
      })
      .catch(function(err){
        console.log(`error to add new article ${err}`);
      })
  })
})

describe('Edit a article', function(){
	this.timeout(15000)

	it('expect to able edit a article\'s content', function(done){
		nightmare
			.goto(`${URL}`)
			.wait(1000)
			.click(`#edit10`)
			.wait(1000)
			.insert(`input#title`, '')
			.wait(1000)
			.type(`input#title`, 'new update title from test e2e')
			.wait(1000)
			.insert(`textarea#content`, '')
			.wait(1000)
			.type(`textarea#content`, 'new update article content from test e2e : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non commodo neque.')
			.click(`button#btn_update`)
			.wait(1000)
			.evaluate(function(){
				// return document.querySelector('#body_table tr:first').innerHTML
				let articleId = $('#body_table tr:first td:first', document).text()
				let title = $('#body_table tr:first td:nth-child(2)', document).text()
				let content = $('#body_table tr:first td:nth-child(3)', document).text()

				let result = {
					"articleId" : articleId,
					"title"			: title,
					"content"		: content
				}
				return result
			})
			.then(function(edited_data){
				console.log(edited_data);
				expect(edited_data.articleId).to.equal('10')
				expect(edited_data.title).to.equal('new update title from test e2e')
				expect(edited_data.content).to.equal('new update article content from test e2e : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non commodo neque.')
				done()
			})
			.catch(function(err){
				console.log(`error to edit article ${err}`);
			})
	})
})

describe('Delete a article', function(){
	this.timeout(15000)

	it('expect to able delete a article', function(done){
		nightmare
			.goto(`${URL}`)
			.wait(2000)
			.click(`#delete10`)
			.wait(1000)
			.click(`#btn_confirm_delete`)
			.wait(1000)
			.evaluate(function(){
				// return document.querySelector('#body_table tr:first').innerHTML
				let articleId = $('#body_table tr:first td:first', document).text()
				let title = $('#body_table tr:first td:nth-child(2)', document).text()
				let content = $('#body_table tr:first td:nth-child(3)', document).text()
				let row_length = $('#body_table tr').length

				let result = {
					"articleId" : articleId,
					"title"			: title,
					"content"		: content,
					"row_length" : row_length
				}

				return result
			})
			.end()
			.then(function(form_data){
				expect(form_data.articleId).to.not.equal('10')
				expect(form_data.title).to.not.equal('new update title from test e2e')
				expect(form_data.content).to.not.equal('new update article content from test e2e : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non commodo neque.')
				expect(form_data.row_length).to.equal(5)
				done()
			})
			.catch(function(err){
				console.log(`error to delete article ${err}`);
			})
	})
})
