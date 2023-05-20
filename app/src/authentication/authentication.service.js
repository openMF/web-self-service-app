(function(){
  'use strict';

    angular.module('selfService')
        .service('AuthService', ['$q', '$http', '$rootScope', '$state', '$resource', 'storageService', 'BASE_URL', 'USER_ROLES', AuthService]);

    function AuthService($q, $http, $rootScope, $state, $resource, storageService, BASE_URL, USER_ROLES) {

        var role            = '',
            userData        = '',       
            isAuthenticated = false;

        storageService.getObject("user_profile").then(function (data) {
            if (data) {
                isAuthenticated = true;
                role = USER_ROLES.user;
                userData = data;
            }
        })

        this.setUser = function (res) {
            storageService.setObject('user_profile', res);
            isAuthenticated = true;
            userData = res;
            role = USER_ROLES.user;
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
        this.doLogin = function() {
            return $resource(BASE_URL +'/self/authentication');
        }

        this.logout = function() {
            role = '';
            userData = '';
            isAuthenticated = false;
            storageService.clear();
            $state.go('login');
        }

        this.register = function(data) {
            return $http.post(BASE_URL + '/self/registration',data);
        }

        this.verifyUser = function(data){
            return $http.post(BASE_URL + '/self/registration/user',data);
        }

    }

})();
