(function () {
    'use strict';

    angular.module('selfService')
        .controller('TakeSurveyCtrl', ['$scope', '$rootScope','$location', TakeSurveyCtrl]);

    function TakeSurveyCtrl($scope, $rootScope,$location) {

        var vm = this;
        vm.proceed = false;
        var currStep = 0;
        vm.proceeded = proceeded;
        vm.selectsurvey = selectsurvey;
        vm.selectedSurvey = selectedSurvey;
        vm.next = next;
        vm.prev = prev;
        vm.step = step;
        var totalquestions = 0;
        vm.totalQuestions = totalQuestions;
        vm.answer = answer;
        vm.determinateValue= determinateValue;


        function proceeded() {
            vm.proceed = true;
        }

        function selectsurvey(){
            $location.path('/surveys');
        }

        function next(){
            currStep++;
        }

        function prev(){
            currStep--;
        }

        function step(){
            return currStep;
        }

        vm.surveys = [
        ];

       function selectedSurvey(survey){
           totalquestions =  survey.questionDatas.length;
       }

       function totalQuestions(){
           return totalquestions;
       }

       function answer(ans){
           ans = JSON.parse(ans);
           return ans.text;
       }
        function determinateValue(){
            return (vm.step()/vm.totalQuestions())*100;
        }

    }
})();