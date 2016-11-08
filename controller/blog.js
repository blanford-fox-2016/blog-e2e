'use strict'

const express = require('express');
const mongoose = require('mongoose');
const Blog = require('../models/blog');

let create = (req,res) => {
console.log(req.body);
    Blog.create({
      postId: req.body.postId,
      title:req.body.title,
      content: req.body.content
    }, (err,data) => {
      if (err) {
        res.status(404)
      } else {
        res.json(data)
      }
    })

}

let showAll = (req,res) => {
console.log(req.body);
  Blog.find({}, (err,data) => {
    if (err) {
      res.status(404)
    } else {
      res.json(data)
    }
  })

}

let deleteBlog = (req,res) => {
  console.log("masukkkkk");
  console.log(req.params.id);
  Blog.findByIdAndRemove(req.params.id,(err,data) => {
    if (err) {
      res.status(404)
    } else {
      res.json(data)
    }
  })
}

let update = (req,res) => {
  // console.log("masuk");
  // console.log(req.params._id);
  let options = { multi: true }
  Blog.update({postId:req.params.id},
    {
      title:req.body.title,
      content: req.body.content
    },
    options, (err,data) => {
      if (err) {
        res.status(404)
      }else {
        res.json(data)
      }
    })
  // Blog.findOneAndUpdate({postId:req.params.id},{

  // },(err,blog) => {
  //   if (err) {
  //     res.status(404)
  //   }else {
  //     console.log(blog);
  //     res.json(blog)
  //   }
  // })
}

module.exports = ({

  create:create,
  showAll:showAll,
  update:update,
  deleteBlog:deleteBlog

})
