(function(){
  'use strict';

    angular.module('selfService')

      .config(function ($mdThemingProvider, $mdIconProvider, $httpProvider, BASE_URL) {

          $mdThemingProvider
            .theme('default')
            .primaryPalette('blue', {
              'default': '600'
            })
            .accentPalette('teal', {
              'default': '500'
            })
            .warnPalette('defaultPrimary');

          $mdThemingProvider
            .theme('dark', 'default')
            .primaryPalette('defaultPrimary')
            .dark();

          $mdThemingProvider
            .theme('grey', 'default')
            .primaryPalette('grey');

          $mdThemingProvider
            .theme('custom', 'default')
            .primaryPalette('defaultPrimary', {
              'hue-1': '50'
          });

          $mdThemingProvider
            .definePalette('defaultPrimary', {
              '50':  '#FFFFFF',
              '100': 'rgb(255, 198, 197)',
              '200': '#E75753',
              '300': '#E75753',
              '400': '#E75753',
              '500': '#E75753',
              '600': '#E75753',
              '700': '#E75753',
              '800': '#E75753',
              '900': '#E75753',
              'A100': '#E75753',
              'A200': '#E75753',
              'A400': '#E75753',
              'A700': '#E75753'
            });

          $mdIconProvider
            .icon('user', 'assets/images/user.svg', 64);


          //$httpProvider.interceptors.push('httpRequestInterceptor');
          
          $httpProvider.defaults.useXDomain = true;
          //Set headers
          $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
          // Mifos set Tenant
          $httpProvider.defaults.headers.common['Fineract-Platform-TenantId'] = 'default';

        }
      )

      .run(['$rootScope', function($rootScope) {
        $rootScope.userDetails = {};
        $rootScope.userDetails.partyDetail = {};
        if(localStorage.getItem("userDetails")){
          $rootScope.userDetails = JSON.parse(localStorage.getItem("userDetails"));
          $rootScope.auth = localStorage.getItem("auth");
        }
      }])
      
      // .factory('httpRequestInterceptor', ['$rootScope', function($rootScope) {
      //   return {
      //         request: function($config) {
      //           $config.headers['Authorization'] = 'Basic ' + $rootScope.auth;
      //           return $config;
      //         }
      //     }
      // }])

      // .run(function($rootScope, $window, $state, LoginService, AUTH_EVENTS) {
      //   $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {
      //     if ('data' in next && 'authorizedRoles' in next.data) {
      //       var authorizedRoles = next.data.authorizedRoles;
      //       if (!LoginService.isAuthorized(authorizedRoles)) {
      //         event.preventDefault();
      //         if($state.current.name.length == 0) {
      //           $state.go('login')
      //         } else {
      //           $state.go($state.current, {}, {reload: true});
      //           $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);  
      //           $("background").remove();  
      //         }
      //       }
      //     }

      //     if (LoginService.isAuthenticated()) {
      //       $("background").remove();
      //       if (next.name == 'login') {
      //         event.preventDefault();
      //         if($state.current.name.length == 0) {
      //            $state.go('app.did')
      //         } else {
      //            $state.go($state.current, {}, {reload: true});
      //            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);    
      //         } 
      //       }
      //     }
      //   });

      // });

})();