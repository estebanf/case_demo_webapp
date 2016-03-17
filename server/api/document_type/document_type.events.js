/**
 * DocumentType model events
 */

'use strict';

import {EventEmitter} from 'events';
var DocumentType = require('../../sqldb').DocumentType;
var DocumentTypeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
DocumentTypeEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  DocumentType.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    DocumentTypeEvents.emit(event + ':' + doc._id, doc);
    DocumentTypeEvents.emit(event, doc);
    done(null);
  }
}

export default DocumentTypeEvents;
