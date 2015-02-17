/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../constants/TodoConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _todos = [];

/**
 * Create a TODO item.
 * @param  {string} title The content of the TODO
 */
function create(title) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _todos[id] = {
    id: id,
    completed: false,
    title: title
  };

  $.ajax('http://localhost:3000/todos/', {
    method: 'POST',
    data: JSON.stringify(_todos[id]),
    contentType: 'application/json'
  });
}

/**
 * Update a TODO item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(id, updates) {
  var index = _.findIndex(_todos, { id: id });

  _.assign(_todos[index], updates);

  $.ajax('http://localhost:3000/todos/' + id, {
    method: 'PATCH',
    data: JSON.stringify(updates),
    contentType: 'application/json'
  });
}

/**
 * Update all of the TODO items with the same object.
 *     the data to be updated.  Used to mark all TODOs as completed.
 * @param  {object} updates An object literal containing only the data to be
 *     updated.

 */
function updateAll(updates) {
  for (var id in _todos) {
    update(id, updates);
  }
}

/**
 * Delete a TODO item.
 * @param  {string} id
 */
function destroy(id) {
  $.ajax('http://localhost:3000/todos/' + id, {
    method: 'DELETE'
  });

  var index = _.findIndex(_todos, { id: id });

  delete _todos[index];
}

/**
 * Delete all the completed TODO items.
 */
function destroyCompleted() {
  for (var id in _todos) {
    if (_todos[id].complete) {
      destroy(id);
    }
  }
}

var TodoStore = assign({}, EventEmitter.prototype, {

  /**
   * Tests whether all the remaining TODO items are marked as completed.
   * @return {boolean}
   */
  areAllCompleted: function() {
    for (var id in _todos) {
      if (!_todos[id].complete) {
        return false;
      }
    }
    return true;
  },

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    if (_todos.length < 1) {
      $.get('http://localhost:3000/todos', function(response) {
        _todos = response;

        if (_todos.length > 0) {
          TodoStore.emitChange();
        }
      }.bind(this));
    }

    return _todos;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var title;

  switch(action.actionType) {
    case TodoConstants.TODO_CREATE:
      title = action.title.trim();
      if (title !== '') {
        create(title);
      }
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_TOGGLE_COMPLETE_ALL:
      if (TodoStore.areAllCompleted()) {
        updateAll({completed: false});
      } else {
        updateAll({completed: true});
      }
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_UNDO_COMPLETED:
      update(action.id, {completed: false});
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_COMPLETED:
      update(action.id, {completed: true});
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_UPDATE_TITLE:
      title = action.title.trim();
      if (title !== '') {
        update(action.id, {title: title});
      }
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_DESTROY:
      destroy(action.id);
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_DESTROY_COMPLETED:
      destroyCompleted();
      TodoStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = TodoStore;
