(function () {
    'use strict';

    angular.module('selfService')
        .controller('HelpCtrl', ['$scope', '$rootScope', '$state', '$stateParams','HelpService', HelpCtrl]);

    function HelpCtrl ($scope, $rootscope, $state, $stateParams, HelpService) {
        var vm=this;

        vm.faqData=[];
        vm.getfaq = getfaq;

        function getfaq() {
            HelpService.getFAQ().get().$promise.then(function (data) {
                vm.faqData = data;

            })
        }

    }
})();