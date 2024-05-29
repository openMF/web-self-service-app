(function () {
    'use strict';

    angular.module('selfService')
        .controller('ViewSurveyCtrl', ['$scope', '$rootScope', '$location', ViewSurveyCtrl]);

    function ViewSurveyCtrl($scope, $rootScope, $location) {

        var vm = this;
        vm.takeSurvey = takeSurvey;
        vm.viewsurvey = viewsurvey;
        vm.answersData = {};

        function takeSurvey() {
            $location.path('/takesurvey');
        }

        function viewsurvey(){
            $location.path('/viewsurvey');
        }
    }
})();