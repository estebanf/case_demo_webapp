/**
 * Claim model events
 */

'use strict';

import {EventEmitter} from 'events';
var Claim = require('../../../../sqldb').Claim;
var ClaimEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ClaimEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Claim.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    ClaimEvents.emit(event + ':' + doc._id, doc);
    ClaimEvents.emit(event, doc);
    done(null);
  }
}

export default ClaimEvents;
