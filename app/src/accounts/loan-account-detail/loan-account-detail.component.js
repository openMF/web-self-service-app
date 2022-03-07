(function () {
    'use strict';

    angular.module('selfService')
        .controller('LoanAccountViewCtrl', ['$state', '$stateParams', '$filter', 'LoanAccountService', LoanAccountViewCtrl]);

    /**
     * @module LoanAccountViewCtrl
     * @description
     * Handles the Loan Account Details Page.
     */
    function LoanAccountViewCtrl($state, $stateParams, $filter, LoanAccountService) {

        var vm = this;
        vm.addtoPocket = addtoPocket;
        vm.fav1=[];
        vm.inPocket=false;
        vm.removeFromPocket=removeFromPocket;
        vm.client = JSON.parse(sessionStorage.getItem('user_profile')).userId;
        var pocket = new Object();
        pocket.accounts={};
        pocket.userId = vm.client;

        /**
         * @name loadingLoanAccountInfo
         * @description flag to check whether account info is loaded or not
         * @type {boolean}
         */
        vm.loadingLoanAccountInfo = true;

        /**
         * @name loanAccountDetails
         * @type {object}
         * @description To store the loan Account details returned by server
         */
        vm.loanAccountDetails = getLoanDetails($stateParams.id);

        /**
         * @name statusClass
         * @type {string}
         * @description To store the css class for loan status [active, pending, ...]
         */
        vm.statusClass = '';

        vm.repaymentSchedule = {};

        vm.makePayment = makePayment;

        /**
         * @method getLoanDetails
         * @description To get the loan details from the server
         * @param id {number} Loan Account id
         */
        function getLoanDetails(id) {
            LoanAccountService.loanAccount().get({
                id: id,
                associations:'repaymentSchedule,transactions'
            }).$promise.then(function (res) {
                vm.loadingLoanAccountInfo = false;
                vm.loanAccountDetails = res;
                getStatusClass();
                addedToPocket(vm.loanAccountDetails);
            });
        }

        /**
         * @method getStatusClass
         * @description To get the loan account status through the status lookup filter
         */
        function getStatusClass() {
            var statusClass = $filter('StatusLookup')(vm.loanAccountDetails.status.code);
            statusClass = 'bg_' + statusClass;
            if (vm.loanAccountDetails.inArrears) {
                statusClass += 'overdue';
            }
            vm.statusClass = statusClass;
        }

        function makePayment() {
            $state.go('app.transfers', {
                toAccount: vm.loanAccountDetails
            });
        }

        function addtoPocket(loanaccount){
            pocket = window.localStorage.getItem('pocket');
            if(pocket==null){
                pocket = new Object();
                pocket.accounts=[];
                pocket.userId = vm.client;

            }else{
                eval('pocket='+pocket);
            }
            var temp={};
            temp.id = loanaccount.id;
            temp.accountNo = loanaccount.accountNo;
            temp.type = loanaccount.depositType;
            pocket.accounts.push(temp);
            temp = {};
            window.localStorage.setItem('pocket', JSON.stringify(pocket));
            addedToPocket(loanaccount);
        }

        function addedToPocket(loanaccount){
            var fav=JSON.parse(window.localStorage.getItem('pocket'));
            for(var i=0;i<fav.accounts.length;i++){
                if(loanaccount.accountNo==fav.accounts[i].accountNo){
                    vm.inPocket=true;
                    break;
                }
                else{
                    vm.inPocket=false;
                }
            }
        }

        function removeFromPocket(loanaccount){
            var fav=JSON.parse(window.localStorage.getItem('pocket'));
            for(var i=0;i<fav.accounts.length;i++){
                if(loanaccount.accountNo==fav.accounts[i].accountNo){
                    fav.accounts.splice(i,1);
                    break;
                }
            }
            window.localStorage.setItem('pocket', JSON.stringify(fav));
            addedToPocket(loanaccount);
        }
    }
})();