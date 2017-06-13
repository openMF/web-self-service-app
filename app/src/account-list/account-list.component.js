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
			vm.clients   	= getClients();//@todo check if this is behind the 2 calls
			vm.accounts  	= [];
			vm.loanAccounts  	= [];
			vm.savingsAccounts  	= [];
			vm.shareAccounts  	= [];
			vm.loadingAccountInfo = true;
			vm.totalNoOfAccounts = 0;
			vm.accountsProcessed = 0;

			vm.query = {
				limit: 5,
				offset: 1
			};

			function getClients(){
				AccountService.getClients().get().$promise.then(function(res){
					vm.clients 			 = res;
					vm.totalNoOfAccounts = res.pageItems.length;
					$.each( res.pageItems, function( i, val ){
						getAccounts( val.id, vm.query );
					});
				})
			}
			function getAccounts( accountNo, query ) {
				AccountService.getAllAccounts(accountNo).get(query).$promise.then(function(res) {
					vm.loanAccounts 	= res.loanAccounts;//@todo Accounts currently retrieved twice.Also, check whether all accounts for all clients are retrieved
					vm.savingsAccounts 	= res.savingsAccounts;
					vm.shareAccounts	= res.shareAccounts;
					vm.accountsProcessed++;
					if( vm.accountsProcessed  == vm.totalNoOfAccounts ){
			  			vm.loadingAccountInfo = false;
					}
			  	});

			}

			function onPaginate(offset, limit) {
				console.log(offset,"====",limit);
			};

			function onReorder(order) {
				console.log(order,"====");
			};

			function routeTo( accountType, id ) {
				var routingSlug = 'viewloanaccount';
				if( 'savings' == accountType ){
					routingSlug = 'viewsavingsaccount';
				}else if( 'loan' == accountType ){
					routingSlug = 'viewloanaccount';
				}else{
					routingSlug = 'viewshareaccount';
				}
				$location.path('/app/'+routingSlug+'/' + id );
			}


		}

})();
