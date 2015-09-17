'use strict';
/// <reference path="../../../typings/tsd.d.ts" />
import {Dispatcher} from './dispatcher';
import {expect} from 'chai';
import {Rx} from 'rx';

describe('Dispatcher', () => {

  let _dispatcher;
  let _dispatcherObsv;

  beforeEach(() => _dispatcher = new Dispatcher());

  it('should allow registering of a callback', () => {

    _dispatcherObsv = _dispatcher.register((payload) => angular.noop);
    expect(_dispatcherObsv.observers).to.have.length(1);

  });


  it('should allow registering of a specific action through filtering', () => {

    let FilterObservable = new Rx.ReplaySubject(1).filter().constructor;
    let obsv = _dispatcher.registerForAction('ACTION_TEST', angular.noop);

    expect(obsv).to.be.an.instanceof(FilterObservable);

  });


  it('should dispatch an action with type to all listeners', (done) => {

    _dispatcher.register((payload) => {
      expect(payload).to.be.an('object');
      expect(payload).to.have.property('actionType');
      expect(payload.actionType).to.equal('ACTION_TEST');
      done();
    });

    _dispatcher.dispatch({ actionType: 'ACTION_TEST' });

  });


  it('should dispatch an action to listeners filtered by type', (done) => {

    _dispatcher.registerForAction('ACTION_TEST')
      .subscribe((payload) => {
        expect(payload).to.be.an('object');
        expect(payload).to.have.property('actionType');
        expect(payload.actionType).to.equal('ACTION_TEST');
        done();
      });

    _dispatcher.dispatch({ actionType: 'ACTION_TEST' });

  });


  it('should not dispatch an action without type', () => {

    expect(_dispatcher.dispatch).to
      .throw('payload must be an object with at least an actionType property');

  });

});
