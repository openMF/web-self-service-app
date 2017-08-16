(function () {
    'use strict';

    angular.module('selfService')
        .directive('apiValidate', ['$compile', apiValidate]);

    function apiValidate($compile) {
        return {
            restrict: 'E',
            link: function (scope, elm) {
                var template = '<div class="required" ng-show="respERROR">' +
                    '<div ng-repeat="errorArray in respERROR.data.errors">' +
                    '<label><i class="fa fa-exclamation-circle"></i> ' +
                    '{{' + 'errorArray.userMessageGlobalisationCode' + ' | translate:error.args }}' +
                    '</label>' +
                '</div></div></div><br/>';
                elm.html('').append($compile(template)(scope));
            }
        };
    }

})();