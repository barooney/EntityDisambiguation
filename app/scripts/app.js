'use strict';

/**
 * @ngdoc overview
 * @name entityDisambiguationApp
 * @description
 * # entityDisambiguationApp
 *
 * Main module of the application.
 */
angular
  .module('entityDisambiguationApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/disambiguate', {
        templateUrl: 'views/disambiguate.html',
        controller: 'DisambiguateCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
