(function () {
    'use strict';

    angular.module('selfService')
        .controller('BeneficiariesListCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$mdDialog', '$mdToast', 'BeneficiariesService', BeneficiariesListCtrl]);

    function BeneficiariesListCtrl($scope, $rootScope, $state, $stateParams, $mdDialog, $mdToast, BeneficiariesService) {

        var vm = this;
        vm.loadingBeneficiaries = true;
        vm.beneficiaries = [];
        vm.beneficiariesFilter = "";
        vm.page = 1;
        vm.query = {
            limit: 5,
            offset: 0
        }

        vm.getBeneficiaries = getBeneficiaries();
        vm.addBeneficiary = addBeneficiary;
        vm.goToEdit = goToEdit;
        vm.deleteConfirm = deleteConfirm;

        function getBeneficiaries() {
            BeneficiariesService.getBeneficiaries().query().$promise.then(function(data) {
                vm.beneficiaries = data;
                vm.loadingBeneficiaries = false;
            });
        }

        function addBeneficiary() {
            $state.go('app.addbeneficiary');
        }

        function goToEdit(beneficiary) {
            $state.go('app.editbeneficiary',{
                id: beneficiary.id,
                data: beneficiary
            });
        }

        function deleteConfirm(ev, beneficiary) {
            var confirm = $mdDialog.confirm()
                .title('Are you sure you want to delete?')
                .textContent('This beneficiary will be removed from your account')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Delete!')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function() {
               BeneficiariesService.beneficiary().delete({
                   id: beneficiary.id
               }, function() {
                   $mdToast.show(
                       $mdToast.simple()
                           .textContent('Beneficiary Deleted Successfully')
                           .position('top right')
                   );
                   vm.beneficiaries = vm.beneficiaries.filter(function (benef) {
                       return benef.id !== beneficiary.id
                   });
               });
            }, function() {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Error in Deleting Beneficiary')
                        .position('top right')
                );
            });
        }
    }
})();