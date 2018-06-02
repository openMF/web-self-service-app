(function () {
    'use strict';

    angular.module('selfService')
        .controller('ViewGuarantorsCtrl', ['$scope', '$rootScope', '$state', '$stateParams', 'AccountService', ViewGuarantorsCtrl]);

    function ViewGuarantorsCtrl() {

        var vm = this;

        vm.view_guarantor = view_guarantor;
        vm.edit_guarantor = edit_guarantor;
        vm.delete_guarantor = delete_guarantor;
        vm.form = [

        ];

        function view_guarantor(){
        }

        function edit_guarantor() {

        }

        function delete_guarantor() {

        }
    }
})();