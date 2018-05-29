(function () {
    'use strict';

    angular.module('selfService')
        .controller('ProductDetailsCtrl', ['$scope', '$rootScope', '$state', 'AccountService', 'AuthService', ProductDetailsCtrl]);

    function ProductDetailsCtrl() {

        var vm = this;
        vm.isLoan = isLoan;
        vm.isSavings = isSavings;
        vm.isShares = isShares;
        vm.productData = [
            
        ];

        function isLoan(){
            // Return true if a loan product else false
        }

        function isSavings(){
            // Return true if a savings product else false
        }
        function isShares() {
            // Return true if a share product else false
        }

    }

})();
