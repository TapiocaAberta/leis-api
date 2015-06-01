/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Politician = require('./politician.model');

exports.register = function (socket) {
    Politician.schema.post('save', function (doc) {
        onSave(socket, doc);
    });
    Politician.schema.post('remove', function (doc) {
        onRemove(socket, doc);
    });
}

function onSave(socket, doc, cb) {
    socket.emit('politician:save', doc);
}

function onRemove(socket, doc, cb) {
    socket.emit('politician:remove', doc);
}