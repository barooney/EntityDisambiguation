'use strict';

/**
 * @ngdoc function
 * @name entityDisambiguationApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the entityDisambiguationApp
 */
angular.module('entityDisambiguationApp')
  .controller('MainCtrl', function ($scope, ExchangeData) {
    $scope.ExchangeData = ExchangeData;
  });
