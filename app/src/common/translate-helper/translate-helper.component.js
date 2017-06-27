(function () {
    'use strict';

    angular.module('selfService')
        .controller('translateHelperCtrl', ['$scope', '$rootScope', '$translate', translateHelperCtrl]);

    function translateHelperCtrl($scope, $rootScope, $translate) {
        var vm = this;
        vm.langCode = getLangCode();
        vm.updateLang = updateLang;

        function getLangCode() {
            return $translate.use();
        }

        function updateLang() {
            $translate.use(vm.langCode);
        }
    }

})();
