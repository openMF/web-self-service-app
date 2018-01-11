(function(){
    'use strict';

    angular.module('selfService')
        .controller('DashboardCtrl', ['$filter', 'AccountService', DashboardCtrl]);

    function DashboardCtrl($filter, AccountService) {
        var vm = this;
        vm.dashboardData = {};
        vm.options = {
            chart: {
                type: 'pieChart',
                height: 300,
                showLabels: false,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                duration: 500,
                labelSunbeamLayout: true,
            }
        };

        vm.getDashboardData = getDashboardData();

        function getDashboardData() {
            AccountService.getClientId().then(function (clientId) {
                AccountService.getAllAccounts(clientId).get().$promise.then(function(data) {
                    vm.dashboardData.loanAccounts = data.loanAccounts;
                    vm.dashboardData.savingsAccounts = data.savingsAccounts;
                    vm.dashboardData.shareAccounts = data.shareAccounts;
                    vm.dashboardData.totalAccounts = vm.dashboardData.loanAccounts.length + vm.dashboardData.savingsAccounts.length + vm.dashboardData.shareAccounts.length
                    vm.dashboardData.totalSavings = data.savingsAccounts.reduce(getTotalSavings, 0).toFixed(2);
                    vm.dashboardData.totalLoan = data.loanAccounts.reduce(getTotalLoan, 0).toFixed(2);
                    vm.dashboardData.loanAccountsOverview = getChartData(data.loanAccounts);
                    vm.dashboardData.savingsAccountsOverview = getChartData(data.savingsAccounts);
                    vm.dashboardData.shareAccountsOverview = getChartData(data.shareAccounts);
                });
            })
        }

        function getTotalSavings(total, acc) {
            if(acc.accountBalance) {
                return total + acc.accountBalance;
            } else {
                return total;
            }
        }

        function getTotalLoan(total, acc) {
            if(acc.loanBalance) {
                return total + acc.loanBalance;
            } else {
                return total;
            }
        }

        function getChartData(accounts) {
            var chartObj = {};
            accounts.map(function(acc) {
               chartObj[acc.status.value] = (chartObj[acc.status.value]) ? chartObj[acc.status.value] + 1: 1;
            });
            var chartData  = [];
            var keys = Object.keys(chartObj);
            for (var i in keys) {
                chartData.push({
                    key: keys[i],
                    y: chartObj[keys[i]]
                });
            }
            return chartData;
        }


    }
})();
