(function () {
    'use strict';

    angular.module('selfService')
        .controller('LoanAccountViewCtrl', ['$state', '$stateParams', '$filter', '$location', 'LoanAccountService', LoanAccountViewCtrl]);

    /**
     * @module LoanAccountViewCtrl
     * @description
     * Handles the Loan Account Details Page.
     */
    function LoanAccountViewCtrl($state, $stateParams, $filter, $location, LoanAccountService) {

        var vm = this;
        var idd = $stateParams.id;
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

        vm.createGuarantor = createGuarantor;
        vm.viewGuarantors = viewGuarantors;

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

        function createGuarantor() {
            $location.path('/viewloanaccount/' +idd+ '/createguarantor');
        }

        function viewGuarantors() {
            $location.path('viewloanaccount/' + idd+ '/viewguarantors');
        }
    }
})();