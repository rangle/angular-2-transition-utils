'use strict';
/// <reference path="../../../typings/tsd.d.ts" />
import * as R from 'ramda';

/**
 * The base class for generating actions
 * It accepts a list of string names and:
 * - Generates the functions which make the actual dispatch calls.
 * - Registers the function names to the types object. Therefore, we do not
 *   need to maintain a list of constants and the components can reference
 *   the action type from this list. For example:
 *     testingActions.types.toggleGridStatus ➡ 'toggleGridStatus'
 */
export class Actions {

  public types: Array;

  constructor(
    private dispatcher,
    private _list
  ) {

    this.types = {};
    this.createActions();

  }

  /**
   * Internal method for generating the dispatch calls
   * and registering the types to the types list
   */
  private createActions() {

    R.forEach((actionType) => {

      // Register the action name so that it can be
      // referenced by the listeners
      this.types[actionType] = actionType;

      // Build the dispatch call for the action
      this[actionType] = (_payload) => {

        // Check to see if the payload is an object or not
        let payload = R.is(Object, _payload) ? _payload : {};
        // Attach action type to the payload
        payload = R.merge(_payload, { actionType: actionType });
        this.dispatcher.dispatch(payload);
        // return payload for testing
        return payload;

      };

    }, this._list);

  }

}
