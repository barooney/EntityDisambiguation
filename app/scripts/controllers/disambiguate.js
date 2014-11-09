'use strict';

/**
 * @ngdoc function
 * @name entityDisambiguationApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the entityDisambiguationApp
 */
angular.module('entityDisambiguationApp')
    .controller('DisambiguateCtrl', function ($scope, $http, ExchangeData) {
        $scope.ExchangeData = ExchangeData;

        $scope.searchEntities = function () {
            return $http.jsonp('http://www.wikidata.org/w/api.php', {
                params: {
                    action: 'wbsearchentities',
                    format: 'json',
                    search: ExchangeData.search,
                    language: 'en',
                    type: 'item',
                    callback: 'JSON_CALLBACK'
                },
                responseType: 'jsonp'
            });
        };

        $scope.getEntities = function (entities) {
            var ids = [];
            entities.search.forEach(function (e) {
                ids.push(e.id);
            });
            return $http.jsonp('http://www.wikidata.org/w/api.php', {
                params: {
                    action: 'wbgetentities',
                    format: 'json',
                    ids: ids.join('|'),
                    props: 'claims|descriptions',
                    languages: 'en',
                    callback: 'JSON_CALLBACK'
                },
                responseType: 'jsonp'
            });
        };

        $scope.filterFunction = null;

        $scope.filterEntities = function (entities) {
            var tmpEntities = entities.entities;
            if (tmpEntities === undefined) { return; }
            if (tmpEntities.length === 1) {
                $scope.ExchangeData.result = [tmpEntities[0]];
            } else {
                switch ($scope.ExchangeData.type) {
                case 'person':
                    $scope.filterFunction = function (e) {
                        if (e.claims === undefined || !e.claims.hasOwnProperty('P31')) { return false; }
                        for (var claim in e.claims.P31) {
                            if (e.claims.P31[claim].mainsnak.datavalue.value['numeric-id'] === 5) { return true; } // is instance of human
                        }
                        return false;
                    };
                    break;
                case 'organization':
                    $scope.filterFunction = function (e) {

                        return (e.claims !== undefined &&
                            (e.claims.hasOwnProperty('P571') ||    // Date of foundation / creation
                                e.claims.hasOwnProperty('P452') || // Industry
                                e.claims.hasOwnProperty('P159') || // Headquarter
                                e.claims.hasOwnProperty('P154') || // Image
                                e.claims.hasOwnProperty('P112')    // Founder
                            ));
                    };
                    break;
                case 'location':
                    $scope.filterFunction = function (e) {
                        return (e.claims !== undefined &&
                            (e.claims.hasOwnProperty('P17') ||     // Country
                                e.claims.hasOwnProperty('P30') ||  // Continent
                                e.claims.hasOwnProperty('P131') || // Administrative Entity
                                e.claims.hasOwnProperty('625')     // Coordinates
                            ));
                    };
                    break;
                }
                var results = [];
                Object.keys(tmpEntities).forEach(function (e) {
                    if ($scope.filterFunction(tmpEntities[e])) {
                        results.push(tmpEntities[e]);
                    }
                });
                console.log(results);
            }
        };

        $scope.searchEntities().success(function (searchResults) {
            $scope.getEntities(searchResults).success(function (entities) {
                $scope.filterEntities(entities);
            });
        });
    });