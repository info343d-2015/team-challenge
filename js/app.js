(function() {
    'use strict';
    var app = angular.module('TeamApp', []);
    app.controller('AppCtrl', ['$scope', function($scope) {

    	$scope.comparePass = function(password, confirmPassword, form) {
    		if(password !== confirmPassword) {
    			console.log(form);
    			form.confirmP.$setValidity("required", false)
    		}
    	}

    }]);
})();
