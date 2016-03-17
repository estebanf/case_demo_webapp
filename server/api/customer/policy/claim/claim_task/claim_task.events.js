/**
 * ClaimTask model events
 */

'use strict';

import {EventEmitter} from 'events';
var ClaimTask = require('../../../../../sqldb').ClaimTask;
var ClaimTaskEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ClaimTaskEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  ClaimTask.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    ClaimTaskEvents.emit(event + ':' + doc._id, doc);
    ClaimTaskEvents.emit(event, doc);
    done(null);
  }
}

export default ClaimTaskEvents;
