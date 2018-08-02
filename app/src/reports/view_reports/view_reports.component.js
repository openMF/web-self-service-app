(function () {
    'use strict';

    angular.module('selfService')
        .controller('ViewReportsCtrl', ['$scope', '$rootScope', '$state','$location', ViewReportsCtrl]);

    function ViewReportsCtrl($scope, $rootScope, $state, $location) {
        var vm = this;
        vm.selected = [];
        vm.routeTo = routeTo;

        function routeTo(report) {
            $location.path('/run_report/' + report.reportName + '/' + report.id + '/' + report.reportType);
        }

        vm.reports = [];

    }

})();