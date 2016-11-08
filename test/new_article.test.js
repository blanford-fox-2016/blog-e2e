'use strict'

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
