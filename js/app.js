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

        $scope.checkBirthDate = function(form) {
            var input = form.birthday;
            var ageDate = new Date();
            ageDate.setFullYear(ageDate.getFullYear() - 13);
            var date = new Date(Date.parse($scope.birthday.toString()));
            if(!isNaN(date)) {
                input.$setValidity('date', true);
                if(date.getTime() < ageDate.getTime()) {
                    input.$setValidity('age', true);
                } else {
                    input.$setValidity('age', false);
                }
            } else {
                input.$setValidity('date', false);
            }
        };

        $scope.reset = function(form) {
            $scope.email = '';
            $scope.firstname = '';
            $scope.lastname = '';
            $scope.birthday = '';
            $scope.pass = '';
            $scope.confirm = '';
            form.lastname.$setUntouched();
            form.birthday.$setUntouched();
            form.password.$setUntouched();
            form.confirmP.$setUntouched();
        };

        $scope.signUp = function(form) {
            $scope.reset(form);
        };

    }]);
})();
