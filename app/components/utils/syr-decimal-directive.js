'use strict';

angular.module('myApp.utils.syr-decimal-directive', [])

.directive('syrDecimal', ['$filter', function($filter) {
    var defaultDecimalPart = 3;
    var defaultIntegerPart = 13; 
    var FLOAT_REGEXP_3 = /^\$?\d+(\.\d*)?$/;
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            
            ctrl.$parsers.unshift(function (viewValue) {
                var decimalPart = defaultDecimalPart;
                if (isFinite(attrs.syrDecimalPart) && parseInt(attrs.syrDecimalPart) > 0) {
                    decimalPart = parseInt(attrs.syrDecimalPart);
                }
                var integerPart = defaultIntegerPart;
                if (isFinite(attrs.syrIntegerPart) && parseInt(attrs.syrIntegerPart) > 0) {
                    integerPart = parseInt(attrs.syrIntegerPart);
                }
                var regexp = new RegExp("^\\$?(\\d{1,"+integerPart+"})((\\.|\\,)\\d{1,"+decimalPart+"})?$", "g");
                //console.log('integer part ' + integerPart + ' decimal part ' + decimalPart + ' regexp ' + regexp.source);
            
                if (regexp.test(viewValue)) {
                    ctrl.$setValidity('float', true);
                    return parseFloat(viewValue.replace(',', '.'));
                } else {
                    ctrl.$setValidity('float', false);
                    return undefined;
                }
            });

            ctrl.$formatters.unshift(
               function (modelValue) {
                   return $filter('number')(parseFloat(modelValue) , 2);
               }
           );
        }
    };
}]);
