'use strict';

var mongoose = require('mongoose');
var Item = mongoose.model('Item');

exports.list = function(req, res) {
  Item.find({ owner: req.params.userId }, function(err, item) {
    if (err)
      res.send(err);
    res.json(item);
  });
};

exports.create = function(req, res) {
    var user = req.locals.user;
    var item = new Item(req.body);

    item.owner = user;
    item.save(function(err, item) {
      if (err) res.send(err);

      user.items.push(item);
      user.save(function(err, user) {
        if (err) res.send(err);
        res.json(item);
      });
    });
};

exports.read = function(req, res) {
  Item.findById(req.params.id, function(err, item) {
    if (err)
      res.send(err);
    res.json(item);
  });
};

exports.update = function(req, res) {
  Item.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, item) {
    if (err)
      res.send(err);
    res.json(item);
  });
};

exports.delete = function(req, res) {
  Item.remove({
    _id: req.params.id
  }, function(err, item) {
    if (err)
      res.send(err);
    res.json({ message: 'Item successfully deleted' });
  });
};
