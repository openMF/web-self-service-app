(function () {
    'use strict';

    angular.module('selfService')
        .service('HelpService', ['$q', '$http', '$rootScope', '$state', '$resource', HelpService]);

    function HelpService ($q, $http, $rootScope, $state, $resource) {

        this.getFAQ = function () {
            return $resource(''); // enter the URL of the FAQ
        }



    }
})();