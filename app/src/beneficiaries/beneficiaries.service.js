(function() {
    'use strict';

    angular.module('selfService')
        .service('BeneficiariesService', ['$q', '$http', '$rootScope', '$state', '$resource', 'BASE_URL', BeneficiariesService]);

    function BeneficiariesService($q, $http, $rootScope, $state, $resource, BASE_URL) {

        this.getBeneficiaries = function () {
            return $resource(BASE_URL + '/self/beneficiaries/tpt');
        };

        this.template = function() {
            return $resource(BASE_URL + '/self/beneficiaries/tpt/template');
        }

        this.beneficiary = function () {
            return $resource(BASE_URL + '/self/beneficiaries/tpt/:id',{id: '@id'},{
                update: {
                    method: 'PUT'
                }
            });
        }
    }

})();