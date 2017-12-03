(function () {
    'use strict';
    //@todo Move this service to the common folder
    angular.module('selfService')
        .service('LoanAccountService', ['$q', '$http', '$rootScope', '$resource', 'BASE_URL', LoanAccountService]);

    function LoanAccountService($q, $http, $rootScope, $resource, BASE_URL) {

        this.loanAccount = function () {
            return $resource(BASE_URL + '/self/loans/:id',{id: '@id'});
        }
    }

})();
