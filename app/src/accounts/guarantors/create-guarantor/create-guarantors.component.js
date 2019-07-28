(function () {
    'use strict';

    angular.module('selfService')
        .controller('CreateGuarantorCtrl', ['$scope', '$rootScope', '$state', '$stateParams', 'AccountService', CreateGuarantorCtrl]);

    function CreateGuarantorCtrl() {

        var vm = this;
        vm.existing_user = true;
        vm.form={};
        vm.clients={};




    }
})();