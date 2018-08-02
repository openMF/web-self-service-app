(function () {
    'use strict';

    angular.module('selfService')
        .controller('RunReportCtrl', ['$http', '$scope', '$rootScope','$state', '$stateParams', '$resource', '$location', 'dateFilter', 'BASE_URL', '$sce', 'RunReportService', RunReportCtrl]);

    function RunReportCtrl($http, $scope, $rootScope, $state, $stateParams, $resource, $location, dateFilter, BASE_URL, $sce, RunReportService) {
        var vm = this;


        vm.reportName = $stateParams.name;
        vm.id = $stateParams.id;
        vm.reportData = {};
        vm.reportData.columnHeaders = [];

        vm.isDecimal = isDecimal


        RunReportService.reports().get({reportName: vm.reportName, id: vm.id}).$promise.then(function(data) {
            vm.reportData = data;
            vm.reportData.columnHeaders = data.columnHeaders;
            console.log(vm.reportData.data[0].row);
        });

        function isDecimal (index) {
            if(vm.reportData.columnHeaders && vm.reportData.columnHeaders.length > 0){
                for(var i=0; i<vm.reportData.columnHeaders.length; i++){
                    if(vm.reportData.columnHeaders[index].columnType == 'DECIMAL'){
                        return true;
                    }
                }
            }
            return false;
        };

    }

})();
