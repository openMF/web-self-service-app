(function(){
  'use strict';
//IS thsichaneg hknjseff
    angular.module('selfService')

      .config(function ($mdThemingProvider, $mdIconProvider, $httpProvider, $translateProvider) {

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

          $httpProvider.defaults.useXDomain = true;
          //Set headers
          $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
          // Mifos set Tenant
          $httpProvider.defaults.headers.common['Fineract-Platform-TenantId'] = 'default';

          $translateProvider.useStaticFilesLoader({
              prefix: 'global-translations/locale-',
              suffix: '.json'
          });
          $translateProvider.preferredLanguage('en');

        }
      )

      .run(['$rootScope', '$location', 'AuthService', function($rootScope, $location, AuthService) {
            $rootScope.$on('$locationChangeStart', function () {
                // redirect to login page if not logged in and trying to access a restricted page
                var restrictedPage = $.inArray($location.path(), ['/login']) === -1;
                var loggedIn = AuthService.isAuthenticated();
                if (restrictedPage && !loggedIn) {
                      $location.path('/login');
                }
            });
      }])

})();