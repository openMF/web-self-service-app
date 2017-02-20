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
			vm.clients   	= getClients();
			vm.accounts  	= [];
			vm.loadingAccountInfo = true;
			vm.totalNoOfAccounts = 0;
			vm.accountsProcessed = 0;

			vm.query = {
				limit: 5,
				offset: 0
			};
			getClients();
		 
			function getClients(){
				AccountService.getClients().get(vm.query).$promise.then(function(res){
					vm.clients 			= res;
					vm.totalNoOfAccounts = res.pageItems.length;
					$.each( res.pageItems, function( i, val ){
						getAccounts( val.accountNo, vm.query );
					});
				})
			}
			function getAccounts( accountNo, query ) {		
				AccountService.getAllAccounts(accountNo).get(query).$promise.then(function(res) {
					vm.accounts.concat( vm.accounts, res );
					vm.accountsProcessed++;
					if( vm.accountsProcessed  == vm.totalNoOfAccounts ){
			  			vm.loadingAccountInfo = false;
			  			console.log(vm.accounts)
					}
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