(function(){
	'use strict';

		angular.module('selfService')
			.controller('SavingsAccountViewCtrl', ['$state', '$stateParams', '$filter', '$location', 'SavingsAccountService', SavingsAccountViewCtrl]);
		
		/**
		 * @module SavingsAccountViewCtrl
		 * @description
		 * Handles the individial savings account detail page
		 */
		function SavingsAccountViewCtrl($state, $stateParams, $filter, $location, SavingsAccountService) {

            var vm = this;
            vm.loadingSavingsAccount = true;
            vm.fav1 = [];
            vm.inPocket = false;
            vm.removeFromPocket = removeFromPocket;
            vm.client = JSON.parse(sessionStorage.getItem('user_profile')).userId;
            var pocket = new Object();
            pocket.accounts=[];
            pocket.userId = vm.client;

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
            vm.addtoPocket = addtoPocket;
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
                SavingsAccountService.savingsAccount().get({
                    id: id,
                    associations: 'transactions,charges'
                }).$promise.then(function (res) {
                    vm.loadingSavingsAccount = false;
                    vm.savingsAccountDetails = res;
                    vm.transactions = res.transactions;
                    getStatusClass();
                    addedToPocket(vm.savingsAccountDetails);
                });
            }

            function getStatusClass() {
                var statusClass = $filter('StatusLookup')(vm.savingsAccountDetails.status.code);
                statusClass = 'bg_' + statusClass;
                if (vm.savingsAccountDetails.subStatus.id !== 0) {
                    statusClass = $filter('StatusLookup')(vm.savingsAccountDetails.status.code + vm.savingsAccountDetails.subStatus.value);
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

            function addtoPocket(savingaccount) {
                pocket = window.localStorage.getItem('pocket');
                if(pocket==null){
                    pocket = new Object();
                    pocket.accounts=[];
                    pocket.userId = vm.client;
                }else{
                    eval('pocket='+pocket);
                }
                var temp={};
                temp.id = savingaccount.id;
                temp.accountNo = savingaccount.accountNo;
                temp.type = savingaccount.depositType.value;
                pocket.accounts.push(temp);
                temp = {};
                window.localStorage.setItem('pocket', JSON.stringify(pocket));
                addedToPocket(savingaccount);

            }

            function addedToPocket(savingaccount) {
                var fav=JSON.parse(window.localStorage.getItem('pocket'));
                for(var i=0;i<fav.accounts.length;i++){
                    if(savingaccount.accountNo==fav.accounts[i].accountNo){
                        vm.inPocket=true;
                        break;
                    }
                    else{
                        vm.inPocket=false;
                    }
                }
            }

            function removeFromPocket(savingaccount) {
                var fav=JSON.parse(window.localStorage.getItem('pocket'));
                for(var i=0;i<fav.accounts.length;i++){
                    if(savingaccount.accountNo==fav.accounts[i].accountNo){
                        fav.accounts.splice(i,1);
                        break;
                    }

                }
                window.localStorage.setItem('pocket', JSON.stringify(fav));
                addedToPocket(savingaccount);
            }
        }
})();