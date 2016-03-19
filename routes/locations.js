'use strict';

var express = require('express');
var router = express.Router();

var db = require('../config/db');

//locations are first -----------------------
//get all existing locations
router.get('/', function(req, res, next) {
  db.query('select * from locations', function(err, locations) {
    if(err) return res.status(400).send(err);

    res.send(locations);
  });
});

//make a new location
router.post('/', function(req, res) {
  db.query('insert into locations set ?', req.body, function(err, result) {
    if(err) return res.status(400).send(err);

    res.send(result);
  });
});

//edit existing location
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

//delete location
//NOTICE:  Cascading delete will remove all notes
//associated with the deleted location.
router.delete('/:id', function(req, res) {
  var id = req.params.id;

  db.query('delete from locations where id=?', id, function(err, result) {
    if(err) return res.status(400).send(err);

    res.send(result);
  });
});

//ALL notes handling below here ------------------------

//get all NOTES
router.get("/notes/:id", function(req, res) {
  db.query("select * from notes where locations_id =?", req.params.id,
    function(err, notes) {
      if(err) return res.status(400).send(err);

      res.send(notes);
    })
});

//add a new note to the corresponding location.
//the id param is the id of the location
router.post("/notes/:id", function(req, res) {
  var locId = req.params.id;
  var note = req.body.note;

  db.query("insert into notes set locations_id=?, note=?",
          [locId, note], function(err, result) {
            if(err) return res.status(400).send(err);

            res.send(result);
          });
});


//edit existing note for location
router.put("/notes/:id", function(req, res) {
  var id = req.params.id;
  var note = req.body.note;

  db.query("update notes set note=? where id=?",
          [note, id], function(err, result) {

            if(err) return res.status(400).send(err);

            res.send(result);
  });
});

//delete only one note for a location
//the id param is the NOTES id, NOT the location id
router.delete("/notes/:id", function(req, res) {
  var id = req.params.id;

  db.query("delete from notes where id=?", id, function(err, result) {
    if(err) return res.status(400).send(err);

    res.send(result);
  })
})

module.exports = router;
