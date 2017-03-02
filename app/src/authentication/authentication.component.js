(function(){
	'use strict';

		angular.module('selfService')
			.controller('LoginCtrl', ['$scope', '$rootScope', '$state','$mdToast', 'AUTH_EVENTS', 'AuthService', LoginCtrl]);

		function LoginCtrl($scope, $rootScope, $state,$mdToast, AUTH_EVENTS, AuthService) {

			$scope.doLogin = function() {
		        AuthService.doLogin($scope.loginData).save().$promise.then(function(result) {
		        	AuthService.setUser(result);
		        	$mdToast.show(
				        $mdToast.simple()
				          .content("Successful Login")
				          .hideDelay(2000)
				          .position('top right')
				    );
	                $state.go("app.clients");
				});
			}

			$scope.passwordReset = function () {
				console.log('password reset');
            }
			
		}

})();