'use strict';

/**
 * @ngdoc function
 * @name entityDisambiguationApp.factory:ExchangeData
 * @description
 * # ExchangeData
 * Factory of the entityDisambiguationApp
 */
angular.module('entityDisambiguationApp')
  .factory('ExchangeData', function() {
    return {
        search: 'Hasso Plattner Institute',
        type: 'organization',
        result: null
    };
  });