(function () {
    'use strict';

    angular.module('selfService')
        .controller('SurveyCtrl', ['$scope', '$rootScope', '$location', SurveyCtrl]);

    function SurveyCtrl($scope, $rootScope, $location) {

        var vm = this;
        vm.takeSurvey = takeSurvey;
        vm.viewsurvey = viewsurvey;
        vm.surveys={};

        function takeSurvey() {
            $location.path('/takesurvey');
        }

        function viewsurvey(survey){
            var id = survey.id;
            $location.path('/viewsurvey/'+id);
        }
    }
})();