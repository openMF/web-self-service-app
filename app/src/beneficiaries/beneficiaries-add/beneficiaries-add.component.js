(function () {
    'use strict';

    angular.module('selfService')
        .controller('BeneficiariesAddCtrl', ['$scope', '$state', '$stateParams', '$filter', '$mdDialog', '$mdToast', 'BeneficiariesService', BeneficiariesAddCtrl]);

    function BeneficiariesAddCtrl($scope, $state, $stateParams, $filter, $mdDialog, $mdToast, BeneficiariesService) {

        var vm = this;
        vm.addBeneficiaryFormData = {
            "locale": "en_GB"
        };
        vm.accountTypeOptions = [];
        vm.getBeneficiaryTemplate = getBeneficiaryTemplate();
        vm.clearForm = clearForm;
        vm.submit = submit;

        function getBeneficiaryTemplate() {
            BeneficiariesService.template().get().$promise.then(function (data) {
                vm.accountTypeOptions = data.accountTypeOptions;
            })
        }

        function clearForm() {
            $scope.addBeneficiaryForm.$setPristine();
            $scope.addBeneficiaryForm.$setUntouched();
            vm.addBeneficiaryFormData = {
                "locale": "en_GB"
            };
        }

        function submit(ev) {
            $mdDialog.show({
                controller: 'ReviewBeneficiaryDialogCtrl',
                controllerAs: 'vm',
                templateUrl: 'src/beneficiaries/beneficiaries-add/review-beneficiary-dialog/review-beneficiary-dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                locals: {addBeneficiaryFormData: vm.addBeneficiaryFormData},
                clickOutsideToClose: true
            }).then(function (result) {
                if (result === "success"){
                    clearForm();
                }
            }, function() {
                clearForm();
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Add Beneficiary Cancelled')
                        .position('top right')
                );
            });
        }
    }
})();