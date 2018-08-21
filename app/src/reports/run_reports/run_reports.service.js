(function () {
    'use strict';

    angular.module('selfService')
        .service('RunReportService', ['$q', '$http', '$rootScope', '$state', '$resource', 'BASE_URL', RunReportService]);

    function RunReportService($q, $http, $rootScope, $state, $resource, BASE_URL) {

        this.reports = function () {

            return $resource(BASE_URL + "/self/runreports/:reportName" + '?R_officeId='+ ':id', {reportName: '@reportName', id: '@id'});


        }

    }

})();