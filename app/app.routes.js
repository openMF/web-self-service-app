(function () {
    'use strict';

    angular.module('selfService')

        .config(function ($stateProvider, $urlRouterProvider, USER_ROLES) {

            $urlRouterProvider
                .otherwise('/login');

            $stateProvider
                .state('app', {
                    url: '/app',
                    abstract: true,
                    templateUrl: 'src/common/main.html',
                    controller: 'MainCtrl',
                    controllerAs: 'vm',
                    data: {
                        authorizedRoles: [USER_ROLES.user]
                    }
                })
                .state('app.dashboard', {
                    url: '/dashboard',
                    templateUrl: 'src/common/dashboard.html',
                    controller: 'MainCtrl',
                    controllerAs: 'vm',
                    data: {
                        controller: 'ClientCtrl',
                    controllerAs: 'vm',
                        title: 'Profile',
                        authorizedRoles: [USER_ROLES.user]
                    }
                })
                .state('app.accounts', {
                    url: '/accounts',
                    templateUrl: 'src/account-list/account-list.html',
                    controller: 'AccountCtrl',
                    controllerAs: 'vm',
                    data: {
                        title: 'Accounts',
                        authorizedRoles: [USER_ROLES.user]
                    }
                })
                .state('app.viewloanaccount', {
                    url: '/viewloanaccount/:loanId',
                    templateUrl: 'src/loan-account-detail/loan-account-detail.html',
                    controller: 'LoanAccountViewCtrl',
                    controllerAs: 'vm',
                    data: {
                        title: 'View Loan Account',
                        authorizedRoles: [USER_ROLES.user]
                    }
                })
                .state('app.recenttransactions', {
                    url: '/recenttransactions',
                    templateUrl: 'src/recent-transactions/recent-transactions.html',
                    controller: 'RecentTransactionCtrl',
                    controllerAs: 'vm',
                    data: {
                        title: 'Recent Transactions',
                        authorizedRoles: [USER_ROLES.user]
                    }
                })
                .state('app.charges', {
                    url: '/charges',
                    templateUrl: 'src/charges/charges.html',
                    controller: 'ChargesCtrl',
                    controllerAs: 'vm',
                    data: {
                        title: 'Charges',
                        authorizedRoles: [USER_ROLES.user]
                    }
                })
                .state('app.aboutus', {
                    url: '/charges',
                    templateUrl: 'src/common/coming-soon.html',
                    controller: 'ClientCtrl',
                    controllerAs: 'vm',
                    data: {
                        title: 'About Us',
                        authorizedRoles: [USER_ROLES.user]
                    }
                })
                .state('app.help', {
                    url: '/charges',
                    templateUrl: 'src/common/coming-soon.html',
                    controller: 'ClientCtrl',
                    controllerAs: 'vm',
                    data: {
                        title: 'Help',
                        authorizedRoles: [USER_ROLES.user]
                    }
                })
                .state('app.profile', {
                    url: '/charges',
                    templateUrl: 'src/common/coming-soon.html',
                    controller: 'ClientCtrl',
                    controllerAs: 'vm',
                    data: {
                        title: 'Profile',
                        authorizedRoles: [USER_ROLES.user]
                    }
                })
                .state('app.transfers', {
                    url: '/transfers',
                    templateUrl: 'src/transfers/transfers.html',
                    controller: 'AccountTransferCtrl',
                    controllerAs: 'vm',
                    data: {
                        title: 'Transfers',
                        authorizedRoles: [USER_ROLES.user]
                    }
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'src/authentication/authentication.html',
                    controller: 'LoginCtrl',
                    controllerAs: 'login',
                    data: {
                        title: 'Login'
                    }
                });
            }
        )
})();
