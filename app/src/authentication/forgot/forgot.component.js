(function () {
    'use strict';

    angular.module('selfService')
        .controller('ForgotPwdCtrl', ['$scope', '$state', '$mdToast', 'AuthService', 'AccountService', ForgotPwdCtrl]);

    /**
     * @module ForgotPwdCtrl
     * @description
     * Handles Forgot Password
     */
    function ForgotPwdCtrl($scope, $state, $mdToast, AuthService, AccountService) {

    }

})();
