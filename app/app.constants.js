(function(){
  'use strict';

  angular.module('selfService')

	.constant("BASE_URL", "https://demo.openmf.org/fineract-provider/api/v1")

	.constant('AUTH_EVENTS', {
		updateUser: 'update-user',
		notAuthorized: 'auth-not-authorized',
		notAuthenticated: 'auth-not-authenticated'
	})

	.constant('USER_ROLES', {
		user: 'USER'
	});

})();