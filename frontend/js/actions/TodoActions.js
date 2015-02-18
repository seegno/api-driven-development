/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoActions
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../constants/TodoConstants');

var TodoActions = {

  /**
   * @param  {string} title
   */
  create: function(title) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_CREATE,
      title: title
    });
  },

  /**
   * @param  {string} id The ID of the ToDo item
   * @param  {string} tile
   */
  updateTitle: function(id, title) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_UPDATE_TITLE,
      id: id,
      title: title
    });
  },

  /**
   * Toggle whether a single ToDo is complete
   * @param  {object} todo
   */
  toggleComplete: function(todo) {
    var id = todo.id;
    if (todo.completed) {
      AppDispatcher.dispatch({
        actionType: TodoConstants.TODO_UNDO_COMPLETED,
        id: id
      });
    } else {
      AppDispatcher.dispatch({
        actionType: TodoConstants.TODO_COMPLETED,
        id: id
      });
    }
  },

  /**
   * Mark all ToDos as complete
   */
  toggleCompleteAll: function() {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_TOGGLE_COMPLETE_ALL
    });
  },

  /**
   * @param  {string} id
   */
  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_DESTROY,
      id: id
    });
  },

  /**
   * Delete all the completed ToDos
   */
  destroyCompleted: function() {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_DESTROY_COMPLETED
    });
  }

};

module.exports = TodoActions;
