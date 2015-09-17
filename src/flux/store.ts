'use strict';
/// <reference path="../../../typings/tsd.d.ts" />
import * as R from 'ramda';
import {List, fromJS} from 'immutable';
import {Rx} from 'rx';

/**
 * The base class for generating a store.
 * Provides utility methods for accessing/updating
 * state and binding actions. Also, Initializes the observable.
 */
export class Store {

  private _obsv: Rx.ReplaySubject<Object>;
  private _state: Object;

  constructor(
    private dispatcher
  ) {

    this.init();
    this.state = fromJS({});

  }

  /**
   * The observable state of this store
   */
  get obsv() {

    return this._obsv;

  }

  /**
   * Update the state
   */
  set state(newState) {

    this._state = this._state ?
                    this._state.mergeDeep(newState) :
                    fromJS(newState);

    this._obsv.onNext(this._state.toJS());

  }

  /**
   * Get the current state as a JS object
   */
  get state(newState) {

    return this._state.toJS();

  }

  /**
   * Register for the action handlers
   */
  private bindActions(actionsDef) {

    R.mapObjIndexed((method, type) => {

      this.dispatcher.registerForAction(type)
        .subscribe((payload) => this[method](payload));

    }, actionsDef);

  }

  /**
   * Get the initial state of the store
   */
  private init() {

    this._obsv = new Rx.ReplaySubject(1);

  }

}
