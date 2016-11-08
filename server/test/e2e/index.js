const Nightmare = require('nightmare')

const chai = require('chai')

const chaiHTTP = require('chai-http')

chai.use(chaiHTTP)

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
		.delete('/api/articles/delete')
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
      .type(`textarea#content`, 'new article content from test e2e : \n Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
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
			.click(`#edit10`)
			.wait(1000)
			.insert(`input#title`, '')
			.wait(1000)
			.type(`input#title`, 'new update title from test e2e')
			.wait(1000)
			.insert(`textarea#content`, '')
			.wait(1000)
			.type(`textarea#content`, 'new update article content from test e2e : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non commodo neque. ')
			.click(`button#btn_update`)
			.wait(1000)
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
			.click(`#delete10`)
			.wait(1000)
			.click(`#btn_confirm_delete`)
			.wait(1000)
			.then(function(){
				done()
			})
			.catch(function(err){
				console.log(`error to delete article ${err}`);
			})
	})
})
