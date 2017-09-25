(function () {
    'use strict';

    angular.module('selfService')
        .directive('translateHelper', translateHelper);

    function translateHelper() {
        var directive = {
            restrict: 'E',
            controller: 'translateHelperCtrl',
            controllerAs: 'vm',
            templateUrl: 'src/common/translate-helper/translate-helper.html'
        }

        return directive;
    }

})();
