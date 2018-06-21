(function(){
    'use strict';

    angular.module('selfService')
        .controller('DashboardCtrl', ['$filter', 'AccountService', 'LoanAccountService', 'SavingsAccountService', DashboardCtrl]);

    function DashboardCtrl($filter, AccountService, LoanAccountService, SavingsAccountService) {
        var vm = this;
        vm.accountTypeOptions = ['Loan', 'Savings', 'Shares'];
        vm.accountno;
        vm.accountType='';
        vm.paymentTypes;
        vm.showTransactionGraph = false;
        vm.transactionDatas = [];
        vm.selectPayment = selectPayment;
        vm.submit = submit;
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

        vm.options2 = {
            chart: {
                type: 'discreteBarChart',
                height: 400,
                x: function(a){return a.label;},
                y: function(a){return a.value;},
                showValues: false,
                showXAxis: false,
                staggerLabels: true,
                duration: 200,
                xAxis: {
                    axisLabel: 'Date of Transaction'
                },
                yAxis: {
                    axisLabel: 'Money in your currency',
                    axisLabelDistance: -5
                }
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

        function getLoanDetails(id,payType) {
            LoanAccountService.loanAccount().get({
                id: id,
                associations: 'transactions'
            }).$promise.then(function (res) {
                vm.loanAccountDetails = res;

                var chartData = [];
                var values2=[];
                vm.paymentTypes =[];
                for(var j in vm.loanAccountDetails.transactions){
                   vm.paymentTypes.push(vm.loanAccountDetails.transactions[j].type.value);
                }
                vm.paymentTypes = remove_duplicates(vm.paymentTypes);

                    for (var i in vm.loanAccountDetails.transactions){

                        if(vm.loanAccountDetails.transactions[i].type.value == payType){
                            var transactionDate = $filter('date')( new Date(vm.loanAccountDetails.transactions[i].date), 'dd MMMM yyyy');
                            values2.push({
                                label: transactionDate,
                                value: vm.loanAccountDetails.transactions[i].amount
                            });
                        }
                    }
                    chartData.push({
                        key: 'transactions',
                        values: values2
                    });
                    vm.transactionDatas=chartData;

            });
        }

        function getSavingsDetail(id,payType) {
            SavingsAccountService.savingsAccount().get({id: id, associations: 'transactions'}).$promise.then(function(res) {
                vm.savingsAccountDetails = res;
                vm.transactions = res.transactions;

                var chartData = [];
                var values2=[];
                vm.paymentTypes =[];
                for(var j in vm.savingsAccountDetails.transactions){
                    vm.paymentTypes.push(vm.savingsAccountDetails.transactions[j].transactionType.value);
                }
                vm.paymentTypes = remove_duplicates(vm.paymentTypes);

                for (var i in vm.savingsAccountDetails.transactions){

                    if(vm.savingsAccountDetails.transactions[i].transactionType.value == payType){
                        var transactionDate = $filter('date')( new Date(vm.savingsAccountDetails.transactions[i].date), 'dd MMMM yyyy');
                        values2.push({
                            label: transactionDate,
                            value: vm.savingsAccountDetails.transactions[i].amount
                        });
                    }
                }
                chartData.push({
                    key: 'transactions',
                    values: values2
                });
                vm.transactionDatas=chartData;

            });
        }



        function remove_duplicates(arr) {
            var seen = {};
            var ret_arr = [];
            for (var i = 0; i < arr.length; i++) {
                if (!(arr[i] in seen)) {
                    ret_arr.push(arr[i]);
                    seen[arr[i]] = true;
                }
            }
            return ret_arr;

        }

        function selectPayment(payType) {
            if(vm.accountType=='Loan'){
                getLoanDetails(vm.accountno, payType);
            }
            if(vm.accountType=='Savings'){
                getSavingsDetail(vm.accountno,payType);
            }
        }

        function submit(payType) {
            if(vm.accountType=='Loan'){
                getLoanDetails(vm.accountno, payType);
                vm.showTransactionGraph=true;
            }
            if(vm.accountType=='Savings'){
                getSavingsDetail(vm.accountno,payType);
                vm.showTransactionGraph=true;
            }


        }



    }
})();
