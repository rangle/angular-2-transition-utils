# Utils

## Component Maker

This is a utility for creating a directive from an Angular 2 style class.

## Validator Maker

This is a utility function for creating a directive specifically for validating
model form fields. It takes three parameters - the function for validating,
which accepts the model value and view value (and should return true or false),
the name of the validation rule (i.e. the name used in the $errors object if the
validation fails), and an object with any other values that should be included
as part of the directive, but avoid using `link`.

Here are the things that should happen when adding a new validator:

Create the new validator class/tests in `components/validators`:

```
import {makeValidator} from 'utils/validator-maker';

export var EverythingIsWonderfulValidator = makeValidator(
  (modelValue, viewValue) => {
    return true;
  },
  'wonderfulnessCheck',
  {}
);
```

In `app/app.ts`:

```
directive('validateWonderful', EverythingIsWonderfulValidator)
```

In `components/error-handling/field-errors/field-errors.html`:

```
<div ng-message="wonderfulnessCheck">Failure of wonder</div>
```

On the form field, where the validator is used:

```
<input ng-model="ctrl.someField" validate-wonderful />
```

## Dependency Injection

These are utilities for doing Angular 2 style dependency injection.