(function () {
    'use strict';

    angular.module('selfService')
        .controller('BeneficiariesEditCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$mdToast', 'BeneficiariesService', BeneficiariesEditCtrl]);

    function BeneficiariesEditCtrl($scope, $rootScope, $state, $stateParams, $mdToast, BeneficiariesService) {

        var vm = this;
        vm.editBeneficiaryFormData = {
            "locale": "en_GB"
        };
        vm.beneficiary = $stateParams.data;
        vm.accountTypeOptions = [];
        vm.getBeneficiaryTemplate = getBeneficiaryTemplate();
        vm.clearForm = clearForm;
        vm.submit = submit;

        function getBeneficiaryTemplate() {
            BeneficiariesService.template().get().$promise.then(function (data) {
                vm.accountTypeOptions = data.accountTypeOptions;
            });

            if(vm.beneficiary !== null) {
                vm.editBeneficiaryFormData.accountType = vm.beneficiary.accountType.id;
                vm.editBeneficiaryFormData.accountNumber = vm.beneficiary.accountNumber;
                vm.editBeneficiaryFormData.officeName = vm.beneficiary.officeName;
                vm.editBeneficiaryFormData.transferLimit = vm.beneficiary.transferLimit;
                vm.editBeneficiaryFormData.name = vm.beneficiary.name;
            }
        }

        function clearForm() {
            $scope.editBeneficiaryForm.$setPristine();
            vm.editBeneficiaryFormData = {
                "locale": "en_GB"
            };
        }

        function submit() {
            var data = {
                name: vm.editBeneficiaryFormData.name,
                transferLimit: vm.editBeneficiaryFormData.transferLimit
            }

            BeneficiariesService.beneficiary().update({id: vm.beneficiary.id}, data).$promise.then(function () {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Beneficiary Updated Successfully')
                        .position('top right')
                );
            }, function (resp) {
                var errors = '';
                if(resp.data){
                    errors = resp.data.errors.map(function (data) {
                        return data.defaultUserMessage;
                    });
                    errors.join(' ');
                }
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Error in Adding Beneficiary: ' + errors)
                        .position('top right')
                );

            });
        }
    }
})();