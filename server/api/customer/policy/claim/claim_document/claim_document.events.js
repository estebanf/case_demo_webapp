/**
 * ClaimDocument model events
 */

'use strict';

import {EventEmitter} from 'events';
var ClaimDocument = require('../../../../../sqldb').ClaimDocument;
var ClaimDocumentEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ClaimDocumentEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  ClaimDocument.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    ClaimDocumentEvents.emit(event + ':' + doc._id, doc);
    ClaimDocumentEvents.emit(event, doc);
    done(null);
  }
}

export default ClaimDocumentEvents;
