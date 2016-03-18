(function(){
  'use strict';

    angular.module('selfService')

      .config(function ($stateProvider, $urlRouterProvider, USER_ROLES) {

          $urlRouterProvider.otherwise('/login');

          $stateProvider
            .state('app', {
              url: '/app',
              abstract: true,
              templateUrl: 'app/components/common/main.html',
              controller: 'MainCtrl',
              controllerAs: 'vm'
            })
            .state('app.dashboard', {
              url: '/dashboard',
              templateUrl: 'app/components/common/dashboard.html',
              controller: 'MainCtrl',
              controllerAs: 'vm',
              data: {
                title: 'Profile',
                authorizedRoles: [USER_ROLES.user]
              }
            })
            .state('app.clients', {
              url: '/clients',
              templateUrl: 'app/components/client/clients.html',
              controller: 'ClientCtrl',
              controllerAs: 'vm',
              data: {
                title: 'Clients',
                authorizedRoles: [USER_ROLES.user]
              }
            })
            .state('app.viewclient', {
              url: '/viewclient/:clientId',
              templateUrl: 'app/components/client/viewclient.html',
              controller: 'ViewClientCtrl',
              controllerAs: 'vm',
              data: {
                title: 'View Client',
                authorizedRoles: [USER_ROLES.user]
              }
            })
            .state('login', {
              url: '/login',
              templateUrl: 'app/components/authentication/login.html',
              controller: 'LoginCtrl',
              controllerAs: 'login',
              data: {
                title: 'Login'
              }
            });

        }
      )

})();