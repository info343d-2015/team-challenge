(function() {
    'use strict';
    var app = angular.module('TeamApp', []);
    app.controller('AppCtrl', ['$scope', function($scope) {

        // Compares passwords to confirm they match
    	$scope.comparePass = function(password, confirmPassword, form) {
    		if(password !== confirmPassword) {
    			form.confirmP.$setValidity("required", false)
    		}
    	};

        // Checks for a valid birthdate, and whether the individual is over 13
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

        // Resets the content of the form
        $scope.reset = function(form) {
            $scope.email = '';
            $scope.firstname = '';
            $scope.lastname = '';
            $scope.birthday = '';
            $scope.pass = '';
            $scope.confirm = '';
            form.email.$setUntouched();
            form.lastname.$setUntouched();
            form.birthday.$setUntouched();
            form.password.$setUntouched();
            form.confirmP.$setUntouched();
        };

        // Signs up the user (Submission functionality not present)
        $scope.signUp = function(form) {
            $scope.reset(form);
        };

    }]);
})();
