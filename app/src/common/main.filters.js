(function () {
    'use strict';

    angular.module('selfService')
        .filter('DateFormat', function (dateFilter) {
            return function (input) {
                if (input) {
                    var tDate = new Date(input);
                    return dateFilter(tDate, 'dd MMMM yyyy');//@todo Add this format to localstorage
                }
                return '';
            };
        });

})();		

