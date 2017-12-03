(function(){
	'use strict';

		angular.module('selfService')
			.controller('SavingsAccountViewCtrl', ['$state', '$stateParams', '$filter', 'SavingsAccountService', SavingsAccountViewCtrl]);
		
		/**
		 * @module SavingsAccountViewCtrl
		 * @description
		 * Handles the individial savings account detail page
		 */
		function SavingsAccountViewCtrl($state, $stateParams, $filter, SavingsAccountService) {

			var vm = this;
			vm.loadingSavingsAccount = true;

            /**
			 * @name statusClass
             * @type {string}
			 * @description Stores the status class of savings account
             */
            vm.statusClass = '';

            /**
			 * @name savingsAccountDetails
			 * @type {object}
			 * @description Stores the savings account details from server
             */
			vm.savingsAccountDetails = getSavingsDetail($stateParams.id);

            /**
			 * @name transactions
             * @type {Array}
             */
			vm.transactions = [];

			vm.getStatusClass = getStatusClass;
			vm.deposit = deposit;
			vm.transfer = transfer;

            /**
			 * @method getSavingsDetail
			 * @description Gets savings account detail from server
			 * @param id {number} Savings Account id
             */
			function getSavingsDetail(id) {
                SavingsAccountService.savingsAccount().get({id: id, associations: 'transactions,charges'}).$promise.then(function(res) {
					vm.loadingSavingsAccount = false;
					vm.savingsAccountDetails = res;
					vm.transactions = res.transactions;
					getStatusClass();
				});
			}

			function getStatusClass() {
                var statusClass = $filter('StatusLookup')(vm.savingsAccountDetails.status.code);
                statusClass = 'bg_' + statusClass;
                if(vm.savingsAccountDetails.subStatus.id !== 0) {
                    statusClass = $filter('StatusLookup')(vm.savingsAccountDetails.status.code+vm.savingsAccountDetails.subStatus.value);
				}

				vm.statusClass = statusClass;
			}

			function deposit() {
				$state.go('app.transfers', {
					toAccount: vm.savingsAccountDetails
				});
			}

			function transfer() {
				$state.go('app.transfers', {
					fromAccount: vm.savingsAccountDetails
				});
			}
		}
})();