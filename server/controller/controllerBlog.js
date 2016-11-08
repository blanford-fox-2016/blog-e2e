const blog = require('../models/modelBlog');

module.exports = {

  // get all blog
  getAllBlog : function(req, res, next) {
    blog.find({}, function(err, data){
      console.log(data);
      res.json(data)
    })
  },

  // insert data blog PPAP
  insertBlog : function(req, res, next){
    // res.header("orgin") / manual way if you are not using cors package
    var data = JSON.parse(req.body.data);

    var newBlog = blog({
      id      : data.id,
      title   : data.title,
      content : data.content
    });

    newBlog.save(function(err, data) {
      if (err) throw err;
      res.json(data)
    });

  },
  // delete data blog
  deleteBlog : function(req, res, next){

    blog.findOneAndRemove({ id : req.body.id }, function(err, data) {
      if (err) throw err;


      res.json(data.id);

    });
  },
  // update data blog
  updateBlog : function(req, res, next){
    var data = JSON.parse(req.body.data)

    console.log(typeof(data));
    console.log(data.id);

    blog.findOneAndUpdate({ id: data.id }, { title: data.title, content : data.content }, { new : true }, function(err, data) {
      if (err) throw err;
      res.json(data)
    });
  },
  // get one data blog
  getOneBlog : function(req, res, next){
    console.log("masuk");
    blog.findOne({ id : req.query.id }, function(err, blog){
      if(!err){
        res.json(blog)
      }else{ console.log("error !"); }
    })
  }

}
