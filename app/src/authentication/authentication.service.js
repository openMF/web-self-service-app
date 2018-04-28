(function(){
  'use strict';

    angular.module('selfService')
        .service('AuthService', ['$q', '$http', '$rootScope', '$state', '$resource', 'storageService', 'BASE_URL', 'USER_ROLES', AuthService]);

    function AuthService($q, $http, $rootScope, $state, $resource, storageService, BASE_URL, USER_ROLES) {

        var role            = '',
            userData        = '',       
            isAuthenticated = false;

        // Set Access Token to requests
        var setAccessToken = function (token) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + token;
        }

        storageService.getObject("user_profile").then(function (data) {
            if (data) {
                isAuthenticated = true;
                role = USER_ROLES.user;
                userData = data;
                setAccessToken(userData.base64EncodedAuthenticationKey);
            }
        })

        this.setUser = function (res) {
            storageService.setObject('user_profile', res);
            isAuthenticated = true;
            userData = res;
            role = USER_ROLES.user;
            setAccessToken(res.base64EncodedAuthenticationKey);
        }

        this.getUser = function() {
            return userData;
        }

        this.isAuthenticated = function () {
            return isAuthenticated;
        };

        this.role = function () {
            return role;
        }

        this.isAuthorized = function (authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (this.isAuthenticated() && authorizedRoles.indexOf(role) !== -1);
        }

        //Resource for REST APIs
        this.doLogin = function(data) {
            return $resource(BASE_URL+'/self/authentication', data);
        }

        this.logout = function() {
            role = '';
            userData = '';
            isAuthenticated = false;
            setAccessToken('');
            storageService.clear();
            $state.go('login');
        }

    }

})();