(function(){
	'use strict';

	angular.module('selfService')
		.controller('ReviewBeneficiaryDialogCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$filter', '$mdDialog', '$mdToast', 'addBeneficiaryFormData', 'BeneficiariesService', ReviewBeneficiaryDialogCtrl])

	function ReviewBeneficiaryDialogCtrl($scope, $rootScope, $state, $stateParams, $filter, $mdDialog, $mdToast, addBeneficiaryFormData, BeneficiariesService) {
		
		var vm = this;
		vm.addBeneficiaryFormData = Object.assign({}, addBeneficiaryFormData);
		vm.cancel = cancel;
		vm.accountType = accountType;
		vm.add = add;
		
		function cancel() {
			$mdDialog.cancel();
		}

		function accountType(id) {
					if (1 == id) {
						return 'Loan Account';
					} else {
						return 'Savings Account';
					}
			}

		function add() {
			// Sending
			BeneficiariesService.beneficiary().save(vm.addBeneficiaryFormData).$promise.then(function () {
					$mdDialog.hide("success");
					$mdToast.show(
						$mdToast.simple()
							.textContent('Beneficiary Added Successfully')
							.position('top right')
					);
					vm.clearForm();
			}, function (resp) {
				var errors = '';
				if (resp.data) {
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
				$mdDialog.hide("error");
			});
		}
	}
})();