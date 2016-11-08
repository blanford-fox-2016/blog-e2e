const customer = require('../models/modelCustomer');

module.exports = {
  // get all data customer from database
  getAllCustomer : function(req, res, next) {
    customer.find({}, function(err, data){
      res.json(data)
    })
  },
  // insert new data customer
  insertCustomer : function(req, res, next){

    var newCustomer = customer({
      id      : req.body.id,
      username   : req.body.username
    });

    newCustomer.save(function(err, data) {
      if (err) throw err;
      res.json(data)
    });

  },
  // update data customer from databse
  updateCustomer : function(req, res, next){

    customer.findOneAndUpdate({ id: req.body.id }, { username: req.body.username }, { new : true }, function(err, data) {
      if (err) throw err;

      res.json(data)

    });

  },
  // delete data customer form databse
  deleteCustomer : function(req, res, next){
    customer.findOneAndRemove({ id : req.body.id }, function(err, data) {
      if (err) throw err;

      console.log(data);
      res.json(data);

    });
  }

}// / module.exports
