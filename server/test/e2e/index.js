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

/* client URL */
const URL = 'http://localhost:8080'

describe('Create new article', function(){
  this.timeout(15000)

  it('expect to able create new article', function(done){
    nightmare
      .goto(`${URL}`)
      .type(`input#articleId`, 1)
      .type(`textarea#content`, 'new article content from test e2e')
      .click(`button#btn_add`)
			.wait(1000)
      .then(function(){
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
			.click(`#edit`)
			.insert(`textarea#content`, '')
			.wait(1000)
			.type(`textarea#content`, 'new update article content from test e2e')
			.click(`button#btn_update`)
			.wait(3000)
			.then(function(){
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
			.click(`#delete`)
			.wait(1000)
			.click(`#btn_confirm_delete`)
			.wait(2000)
			.then(function(){
				done()
			})
			.catch(function(err){
				console.log(`error to delete article ${err}`);
			})
	})
})
