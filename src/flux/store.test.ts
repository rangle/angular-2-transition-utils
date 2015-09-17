'use strict';
/// <reference path="../../../typings/tsd.d.ts" />
import {Store} from './store';
import {expect} from 'chai';
import {Rx} from 'rx';

describe('Store', () => {

  let _scheduler;
  let _mockDispatcher;
  let _store;
  let _newState = {
    test1: 'value1',
    test2: 'value2',
    test3: 'value3'
  };

  beforeEach(() => {

    _scheduler = new Rx.TestScheduler();
    let obsv = _scheduler.createColdObservable(
      Rx.ReactiveTest.onNext(10, {
        actionType: 'ACTION_TEST'
      }));

    _mockDispatcher = {
      registerForAction: (actionType) => {
        return obsv.filter(payload => payload.actionType === actionType);
      },
      dispatch: (payload) => { obsv.onNext(payload); }
    };

    _store = new Store(_mockDispatcher);

  });


  it('should initialize with an observable', () => {

    expect(_store.obsv).to.be.an.instanceof(Rx.ReplaySubject);

  });


  it('should have an internal state', () => {

    expect(_store.state).to.be.an('object');
    expect(_store.state).to.deep.equal({});

  });


  it('should allow the state to be updated', () => {

    _store.state = _newState;
    expect(_store.state).to.deep.equal(_newState);

  });


  it('should bind to actions', (done) => {

    _store.testHandler = (payload) => {
      expect(payload).to.be.an('object');
      expect(payload).to.have.property('actionType');
      expect(payload.actionType).to.equal('ACTION_TEST');
      done();
    };

    _store.bindActions({
      'ACTION_TEST': 'testHandler'
    });

    _scheduler.advanceTo(25);

  });

});
