/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Law = require('./law.model');

exports.register = function (socket) {
    Law.schema.post('save', function (doc) {
        onSave(socket, doc);
    });
    Law.schema.post('remove', function (doc) {
        onRemove(socket, doc);
    });
}

function onSave(socket, doc, cb) {
    socket.emit('law:save', doc);
}

function onRemove(socket, doc, cb) {
    socket.emit('law:remove', doc);
}