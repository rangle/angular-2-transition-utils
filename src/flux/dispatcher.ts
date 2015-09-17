'use strict';
/// <reference path="../../../typings/tsd.d.ts" />
import {List, fromJS} from './npm/immutable';
import * as R from 'ramda';
import {Rx} from 'rx';

/**
 * The dispatcher is used to broadcast payloads to registered callbacks.
 *
 * This is different from generic pub-sub systems in two ways:
 *   - Callbacks are not subscribed to particular events. Every payload is
 *   dispatched to every registered callback.
 *   - Callbacks can be deferred in whole or part until other callbacks have
 *   been executed.
 */
export class Dispatcher {
  private _dispatcherObsv: Rx.ReplaySubject<Object>;

  constructor() {

    this._dispatcherObsv = new Rx.ReplaySubject(1);

  }

  /**
   * Registers a callback to be invoked with
   * every dispatched payload
   * @param  {Function} callback   Function to execute on successful dispatches
   * @return {Function}            The observable which is being subscribed to
   */
  public register(callback) {

    this._dispatcherObsv.subscribe((payload) => callback(payload));
    return this._dispatcherObsv;

  }

  /**
   * Registers for a specific action type only
   * @param  {string}   actionType The type of action to filter by
   * @return {Function}            The Filter Observable
   */
  public registerForAction(actionType) {

    return this._dispatcherObsv.filter(
        payload => payload.actionType === actionType
      );
  }

  /**
   * Dispatches a payload to all registered callbacks
   * @param {object} payload Must contain an actionType property
   */
  public dispatch(payload) {

    if (R.is(Object, payload) && R.prop('actionType')) {
      this._dispatcherObsv.onNext(payload);
    } else {
      throw new Error('payload must be an object with at least an actionType property');
    }

  }
}
