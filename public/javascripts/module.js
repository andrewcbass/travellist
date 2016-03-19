'use strict';

angular.module('travelApp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'partials/home.html',
      controller: 'homeCtrl'
    })
    .state('locations', {
      url: '/locations',
      templateUrl: 'partials/locations.html',
      controller: 'locationsCtrl'
    })
    .state('edit', {
      url: '/edit',
      templateUrl: 'partials/edit.html',
      controller: 'editCtrl'
    })
    .state('add', {
      url: '/add',
      templateUrl: 'partials/add.html',
      controller: 'addCtrl'
    })
});
