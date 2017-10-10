(function(){
	'use strict';

		angular.module('selfService')
			.controller('LoanAccountViewCtrl', ['$scope', '$http','BASE_URL', '$rootScope', '$stateParams', 'AccountService', LoanAccountViewCtrl]);

		function LoanAccountViewCtrl($scope,$http,BASE_URL, $rootScope, $stateParams, AccountService) {

			var vm = this;
			vm.loadingLoanAccountInfo 	= true;
			vm.loanAccountDetails 		= getLoanDetails( $stateParams.loanId );	

			function getLoanDetails( id ) {
				AccountService.getLoanAccount(id).get().$promise.then(function(res) {
					vm.loadingLoanAccountInfo = false;
					vm.loanAccountDetails = res;
				});
			}
		}
})();