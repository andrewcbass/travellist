'use strict';

var app = angular.module('travelApp');

app.controller('mainCtrl', function($scope) {
});

app.controller('homeCtrl', function($scope, $state) {
  $scope.startPlan = function() {
    $state.go("locations")
  }
});

//locations controller
app.controller('locationsCtrl', function($scope, $state, LocationService) {

  //get locations
  LocationService.getLocations()
    .then(function(res) {
      $scope.locations = res.data;
    }, function(err) {
      console.log('err', err)
    });

    //get NOTES
    $scope.notesReturn = function(id) {
      LocationService.getLocationNotes(id)
        .then(function(res) {
          $scope.locNotes = res.data;
        }, function(err) {
          console.log('ERR', err);
        });
    };

    //toggle view to Add NOTES
    $scope.allOrNote = true;
    $scope.toggleNoteView = function(location) {

      if($scope.allOrNote) {
        $scope.addNote(location);
      }
      $scope.allOrNote = !$scope.allOrNote;
    };

    $scope.addNote = function(lct) {
      $scope.noteFor = lct;
    }

    //save NOTES, push to view after confirm DB success
    $scope.saveNote = function(valid) {
      if(!valid) return;

      var newNote = $scope.newNote;
      var locId = $scope.noteFor.id;

      LocationService.addNote(newNote, locId)
      .then(function(res) {
        $scope.newNote = {};
        $scope.locNotes.push(newNote);
        //hide notes add view
        $scope.allOrNote = !$scope.allOrNote;

      }, function(err) {
        console.log("err", err);
      });
    }

    //toggle to view NOTES editor
    $scope.noteEditor = true;
    $scope.toggleEditorView = function(note, city) {
      if($scope.noteEditor) {
        $scope.editNote(note, city);
      }
      $scope.noteEditor = !$scope.noteEditor;
    };

    $scope.editNote = function(note, city) {
      $scope.editNoteLoc = city;
      $scope.editNote = note;
    }

    //save NOTES edit, push to view after confirm DB success
    $scope.saveNoteEdit = function(valid) {
      if(!valid) return;

      var editNote = $scope.editNote;
      var id = editNote.id;

      LocationService.editNote(editNote, id)
        .then(function(res) {
          $scope.locNotes = $scope.locNotes.map(function(note) {
            if(note.id === id) {
              return editNote;
            } else {
              return note;
            }
          });
            $scope.noteEditor = !$scope.noteEditor;
        }, function(err) {
          console.log('ERR', err);
        });
    }

    //delete note on button click, remove from view after DB success
    $scope.deleteNote = function(note) {
      var id = note.id;
      LocationService.deleteNote(id)
      .then(function(res) {
        var index = $scope.locNotes.indexOf(note);
        $scope.locNotes.splice(index, 1);
      }, function(err) {
        console.log('ERR', err);
      });
    }

    //button at top to Add a new location
    $scope.addNewLocation = function() {
      $state.go('add');
    }
});

//edit controller for locations
app.controller('editCtrl', function($scope, $state, LocationService) {
  //populate list of locations
  LocationService.getLocations()
    .then(function(res) {
      $scope.locations = res.data;
    }, function(err) {
      console.log('err', err)
    })

  //delete a location from the list
  //NOTICE:  This will also delete all notes associated with
  //the locationId from the cascading relationship
  $scope.deleteLocation = function(location) {
    var id = location.id;
    LocationService.deleteLocation(id)
      .then(function(res) {
        var index = $scope.locations.indexOf(location)
        $scope.locations.splice(index, 1);
      }, function(err) {
        console.log('err', err);
      })
  }

  //make edit fields show and populate with existing data
  $scope.showBox = false;
  $scope.editLocation = function(location) {
    if ($scope.showBox === true) {
      return $scope.showBox = false;
    }
    $scope.edit = location;
    $scope.showBox = true;
  }

  //save after edit
  $scope.saveEditLocation = function(valid) {
    if (!valid) return;

    var updatedLocation = $scope.edit;

    var id = updatedLocation.id;

    LocationService.editLocation(updatedLocation, id)
      .then(function(res) {
        $scope.locations = $scope.locations.map(function(location) {
          if (location.id === id) {
            return updatedLocation;
          } else {
            return location;
          }
        });
        $scope.showBox = false;
      }, function(err) {
        console.log('ERR', err);
      })
  }

  //change to add location $state
  $scope.addNewLocation = function() {
    $state.go('add');
  }
});

//add location controller
app.controller('addCtrl', function($scope, $state, LocationService) {
  $scope.saveNewLocation = function(valid) {
    if (!valid) return;

    var newLocation = $scope.newLocation;
    LocationService.newLocation(newLocation)
      .then(function(res) {
        $scope.newLocation = {};
        $state.go('edit');
      }, function(err) {
        console.log('err', err);
      })
  }

  //cancel new location creation
  $scope.cancelLocation = function() {
    $state.go('edit');
  }
});
