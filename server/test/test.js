// 'use strict'
//
// const chai = require('chai')
//   , expect = chai.expect
//   , should = chai.should()
//   , chaiHttp = require('chai-http')
//
// chai.use(chaiHttp);
//
//
//
// describe('#Api Blog', function() {
//
//   // test get all data blog from database
//   it('it will be pass if get all data', function(done) {
//     chai.request('http://localhost:3000')
//       .get('/api/blogs')
//       .end(function(err, res) {
//
//       console.log(res.body);
//
//       done()
//     });
//   }) ;
//
//   // test insert data blog into database
//   it('it will be pass if insert give a response message ( insert success )', function(done) {
//     chai.request('http://localhost:3000')
//     .post('/api/blogs')
//     .send({id: '2' ,title: 'hallo', content:'hallo'})
//     .end(function(err, res) {
//
//       console.log(res.body);
//
//       done()
//     });
//   });
//
//   // update data blog from databse
//   it('it will be pass if insert give a response message ( delete success )', function(done) {
//     chai.request('http://localhost:3000')
//     .put('/api/blogs')
//     .send({ id : '2', title: "start world", content: "this is star world"})
//     .end(function(err, res) {
//
//       console.log(res.body);
//
//       done()
//     });
//   }) ;
//
//   // delete data blog from database
//   it('it will be pass if insert give a response message ( delete success )', function(done) {
//     chai.request('http://localhost:3000')
//     .delete('/api/blogs')
//     .send({ id : '2' })
//     .end(function(err, res) {
//
//       console.log(res.body);
//
//       done()
//     });
//   }) ;
//
// }); // describe blog
//
// describe('#Api Customer', function() {
//
//     // test get all data blog from database
//     it('it will be pass if get all data', function(done) {
//       chai.request('http://localhost:3000')
//         .get('/api/customers')
//         .end(function(err, res) {
//
//         console.log(res.body);
//
//         done()
//       });
//     }) ;
//
//   // test insert data customer into database
//   it('it will be pass if insert success ', function(done) {
//     chai.request('http://localhost:3000')
//     .post('/api/customers')
//     .send({id: '1' , username:'alexander'})
//     .end(function(err, res) {
//
//       console.log(res.body);
//
//       done()
//     });
//   });
//
//     // update data blog from databse
//     it('it will be pass if insert give a response message ( delete success )', function(done) {
//       chai.request('http://localhost:3000')
//       .put('/api/customers')
//       .send({ id : '2', username: 'Ananda'})
//       .end(function(err, res) {
//
//         console.log(res.body);
//
//         done()
//       });
//     }) ;
//
//     // delete data blog from database
//     it('it will be pass if insert give a response message ( delete success )', function(done) {
//       chai.request('http://localhost:3000')
//       .delete('/api/customers')
//       .send({ id : '1' })
//       .end(function(err, res) {
//
//         console.log(res.body);
//
//         done()
//       });
//     }) ;
//
// }); // describe customer
