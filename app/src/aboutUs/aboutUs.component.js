(function () {
    'use strict';

    angular.module('selfService')
        .controller('AboutUsCtrl', ['$scope', '$rootScope', '$state', '$stateParams', 'AboutUsService', AboutUsCtrl]);

    function AboutUsCtrl ($scope, $rootScope, $state, $stateParams, AboutUsService) {

        var vm=this;
        vm.org = null; // it is an array, when data is available then vm.org = {JSON data};
        vm.getDetails = getDetails;

        function getDetails() {
            AboutUsService.getOrgDetails.get().$promise.then(function (data){
                vm.org =data;
            })
        }
    }
})();
