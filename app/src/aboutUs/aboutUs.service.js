(function (){
    'use strict';

    angular.module('selfService')
        .service('AboutUsService', ['$q', '$http', '$rootScope', '$state', '$resource', AboutUsService]);

    function AboutUsService($q,$http,$rootScope,$state,$resource){

        this.getOrgDetails = function () {
            return $resource(''); // enter the URL of the organisations details.
        };
    }
})();