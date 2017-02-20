(function(){
	'use strict';

		angular.module('selfService')
			.controller('AccountCtrl', ['$scope', '$rootScope', '$location', 'AccountService', 'AuthService', AccountCtrl]);

		function AccountCtrl($scope, $rootScope, $location, AccountService, AuthService ) {

			var vm 			= this;
			vm.selected 	= [];
			vm.getAccounts 	= getAccounts;
			vm.onPaginate 	= onPaginate;
			vm.onReorder 	= onReorder;
			vm.routeTo 		= routeTo;
			vm.userData		= AuthService.getUser();

			vm.query = {
				limit: 5,
				offset: 0
			};
			
			getAccounts(vm.query);

			function getAccounts(query) {				
				AccountService.getAllAccounts(vm.userData.userId).get(vm.query).$promise.then(function(res) {
					vm.accounts = res;
			  	});
			}

			function onPaginate(offset, limit) {
				console.log(offset,"====",limit)
				getAccounts(angular.extend({}, vm.query, {offset: offset, limit: limit}));
			};

			function onReorder(order) {
				console.log(order,"====")
				getAccounts(angular.extend({}, vm.query, {order: order}));
			};

			function routeTo(id) {
				$location.path('/app/viewaccount/' + id);
			}
			
		  	
		}

})();