'use strict'

angular.module('travelApp')
.factory('LocationService', function($http) {

  function getLocations() {
    return $http.get("/locations")
  };

  function getLocationNotes(id) {
    return $http.get(`/locations/notes/${id}`)
  };

  function addNote(newNote, id) {
    return $http.post(`/locations/notes/${id}`, newNote)
  };

  function deleteNote(id) {
    return $http.delete(`locations/notes/${id}`)
  };

  function deleteLocation(id) {
    return $http.delete(`/locations/${id}`)
  };

  function newLocation(location) {
    return $http.post("/locations", location)
  };

  function editLocation(location, id) {
    return $http.put(`/locations/${id}`, location)
  };

  function editNote(note, id) {
    return $http.put(`/locations/notes/${id}`, note)
  };

  return {
    getLocations: getLocations,
    getLocationNotes: getLocationNotes,
    addNote: addNote,
    deleteNote: deleteNote,
    deleteLocation: deleteLocation,
    newLocation: newLocation,
    editLocation: editLocation,
    editNote: editNote
  }
})
