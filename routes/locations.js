'use strict';

var express = require('express');
var router = express.Router();

var db = require('../config/db');

router.get('/', function(req, res, next) {
  db.query('select * from locations', function(err, locations) {
    if(err) return res.status(400).send(err);

    res.send(locations);
  });
});

router.get("/notes/:id", function(req, res) {
  db.query("select * from notes where locations_id =?", req.params.id,
    function(err, notes) {
      if(err) return res.status(400).send(err);

      res.send(notes);
    })
});

router.post('/', function(req, res) {
  db.query('insert into locations set ?', req.body, function(err, result) {
    if(err) return res.status(400).send(err);

    res.send(result);
  });
});

router.post("/notes/:id", function(req, res) {
  var locId = req.params.id;
  console.log('LOCID', locId);
  var note = req.body.note;
  console.log('NOTE', note);

  db.query("insert into notes set locations_id=?, note=?",
          [locId, note], function(err, result) {
            if(err) return res.status(400).send(err);

            res.send(result);
          });
});

router.put('/:id', function(req, res) {
  var id = req.params.id;
  var city = req.body.city;
  var state = req.body.state;

  db.query('UPDATE locations SET city=?, state=? WHERE id=?',
          [city, state, id], function(err, result) {

    if(err) return res.status(400).send(err);

    res.send(result);
  });
});

router.put("/notes/:id", function(req, res) {
  var id = req.params.id;
  var note = req.body.note;

  db.query("update notes set note=? where id=?",
          [note, id], function(err, result) {

            if(err) return res.status(400).send(err);

            res.send(result);
  });
});

router.delete('/:id', function(req, res) {
  var id = req.params.id;

  db.query('delete from locations where id=?', id, function(err, result) {
    if(err) return res.status(400).send(err);

    res.send(result);
  });
});

router.delete("/notes/:id", function(req, res) {
  var id = req.params.id;

  db.query("delete from notes where id=?", id, function(err, result) {
    if(err) return res.status(400).send(err);

    res.send(result);
  })
})

module.exports = router;
