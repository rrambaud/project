'use strict';

describe('myApp.utils utils module', function() {
    console.log('----------------------------------------------------------');
    console.log('XOXO utils module XOXO');
    beforeEach(module('myApp.utils'));

    var $scope;
    var form;

    beforeEach(inject(function($compile, $rootScope) {
       $scope = $rootScope;
        var element = angular.element(
            '<form name="form">' +
            '<input type="text" ng-model="model.somenum" name="somenum" syr-decimal syr-decimal-part="2" syr-integer-part="4" />' +
            '</form>'
        );
        $scope.model = { somenum: null }
        $compile(element)($scope);
        form = $scope.form;
    }));
    describe('syr-decimal directive', function() {
        it('should pass with integer', function() {
            form.somenum.$setViewValue('30');
            $scope.$digest();
            expect($scope.model.somenum).toEqual(30);
            expect(form.somenum.$valid).toBe(true);
        });
        it('should pass with decimal and dot as decimal separator', function() {
            form.somenum.$setViewValue('3.22');
            $scope.$digest();
            expect($scope.model.somenum).toEqual(3.22);
            expect(form.somenum.$valid).toBe(true);
        });
        it('should pass with decimal and comma as decimal separator', function() {
            form.somenum.$setViewValue('3,2');
            $scope.$digest();
            expect($scope.model.somenum).toEqual(3.2);
            expect(form.somenum.$valid).toBe(true);
        });
        it('should not pass with too large decimal', function() {
            form.somenum.$setViewValue('3.2222');
            $scope.$digest();
            expect($scope.model.somenum).toBeUndefined();
            expect(form.somenum.$valid).toBe(false);
        });
        it('should not pass with too large integer', function() {
            form.somenum.$setViewValue('3000000');
            $scope.$digest();
            expect($scope.model.somenum).toBeUndefined();
            expect(form.somenum.$valid).toBe(false);
        });
        it('should not pass with string', function() {
            form.somenum.$setViewValue('a');
            $scope.$digest();
            expect($scope.model.somenum).toBeUndefined();
            expect(form.somenum.$valid).toBe(false);
        });
        it('should not pass with 1.', function() {
            form.somenum.$setViewValue('1.');
            $scope.$digest();
            expect($scope.model.somenum).toBeUndefined();
            expect(form.somenum.$valid).toBe(false);
        });
    });
});
