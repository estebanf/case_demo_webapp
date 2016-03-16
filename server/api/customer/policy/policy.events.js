/**
 * Policy model events
 */

'use strict';

import {EventEmitter} from 'events';
var Policy = require('../../../sqldb').Policy;
var PolicyEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PolicyEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Policy.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    PolicyEvents.emit(event + ':' + doc._id, doc);
    PolicyEvents.emit(event, doc);
    done(null);
  }
}

export default PolicyEvents;
