declare var angular: any;

/**
 * Wrap an Angular2 style class into a field validator.
 *
 * @param validationFunction - The function to use for validation, with two
 * parameters, modelValue and viewValue.
 * @param validatorName - The name of the validator (this is the key that will
 * be used in the $errors object).
 * @param options - Any additional options to pass in to the directive that is
 * created.
 **/
export function makeValidator(validationFunction, validatorName, options) {
  return function() {
    return angular.extend({
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, elm, attrs, ctrl) {
        ctrl.$validators[validatorName] = validationFunction;
      }
    }, options);
  };
}
