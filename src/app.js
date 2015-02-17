'use strict';

var app = angular.module('app', [ 'angular.parallaxScroll' ]);

app.controller('AppCtrl', function AppCtrl($scope) {
    $scope.handler = function(event) {
        console.log('callback handler' + event);
    };
    $scope.parallaxStyle = {
        'height': '300px'
    };
});
