(function() {
    'use strict';

    angular.module('selfService')
        .service('LoanApplicationService', ['$resource', 'BASE_URL', LoanApplicationService]);

    /**
     * @module LoanApplicationService
     * @description
     * Service required for Loan Application
     */
    function LoanApplicationService($resource, BASE_URL) {

        this.template = function() {
            return $resource(BASE_URL + '/self/loans/template');
        }

        this.loan = function() {
            return $resource(BASE_URL + '/self/loans');
        }
    }

})();