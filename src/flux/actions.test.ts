'use strict';
import {Actions} from './actions';
import {expect} from 'chai';
import {Rx} from 'rx';

describe('Actions', () => {

  let _actions;
  let _mockDispatcher;

  beforeEach(() => {

    _mockDispatcher = {
      _dispatcherObsv: angular.noop,
      dispatch: angular.noop
    };

    _actions = new Actions(_mockDispatcher, [
      'testAction1',
      'testAction2',
      'testAction3'
    ]);

  });

  it('should register actions', () => {

    expect(_actions.types).to.be.an('object');
    expect(_actions.types).to.have.property('testAction1');
    expect(_actions.types).to.have.property('testAction2');
    expect(_actions.types).to.have.property('testAction3');

  });

  it('should create actions that dispatches a payload with actionType', () => {

    expect(_actions.testAction1).to.exist;
    expect(_actions.testAction2).to.exist;
    expect(_actions.testAction3).to.exist;

    let payload = _actions.testAction1({});

    expect(payload).to.be.an('object');
    expect(payload).to.have.property('actionType');
    expect(payload.actionType).to.equal('testAction1');

  });

});
