'use strict'
const express = require('express');
let passport = require('passport')
let LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
