(function(){
	'use strict';

		angular.module('selfService')
			.controller('LoanAccountViewCtrl', ['$scope', '$http','BASE_URL', '$rootScope', '$stateParams', 'AccountService','DateFormatFilter', LoanAccountViewCtrl]);

		function LoanAccountViewCtrl($scope,$http,BASE_URL, $rootScope, $stateParams, AccountService,dateFormatFilter) {

			var vm = this;
			vm.loadingLoanAccountInfo 	= true;
			vm.loanAccountDetails 		= getLoanDetails( $stateParams.loanId );	

		
			//getloanNotes($stateParams.loanId); 

			function getLoanDetails( id ) {
				AccountService.getLoanAccount(id).get().$promise.then(function(res) {
			    	vm.loadingLoanAccountInfo = false;
			    	vm.loanAccountDetails = res;
			  	});
			}			
		  	
		}

})();