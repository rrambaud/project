'use strict';

angular.module('myApp.utils.syr-nine-directive', [])

.directive('syrNine', ['$filter', function($filter) {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            
            ctrl.$parsers.unshift(function (viewValue) {
                console.log('viewValue ' + viewValue);
                if (viewValue == null) {
                    return null;
                }
                var minuts = parseInt($filter('date')(viewValue, 'mm'));
                console.log(minuts%10);
                 
                if (9 === minuts%10) {
                    ctrl.$setValidity('float', true);
                    //return viewValue;
                } else {
                    ctrl.$setValidity('float', false);
                    //return null;
                }
                return viewValue;
            });
            /*
            ctrl.$formatters.unshift(
               function (modelValue) {
                   return $filter('number')(parseFloat(modelValue) , 2);
               }
           );*/
        }
    };
}]);
