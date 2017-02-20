(function(){
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
            .state('app.clients', {
              url: '/clients',
              templateUrl: 'src/client-list/client-list.html',
              controller: 'ClientCtrl',
              controllerAs: 'vm',
              data: {
                title: 'Clients',
                authorizedRoles: [USER_ROLES.user]
              }
            })
            .state('app.viewclient', {
              url: '/viewclient/:clientId',
              templateUrl: 'src/client-view/client-view.html',
              controller: 'ClientViewCtr',
              controllerAs: 'vm',
              data: {
                title: 'View Client',
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