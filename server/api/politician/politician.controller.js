'use strict';

var _ = require('lodash');
var Politician = require('./politician.model');

// Get list of politicians
exports.index = function (req, res) {
    Politician.find(function (err, politicians) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, politicians);
    });
};

// Get a single politician
exports.show = function (req, res) {
    Politician.findById(req.params.id, function (err, politician) {
        if (err) {
            return handleError(res, err);
        }
        if (!politician) {
            return res.send(404);
        }
        return res.json(politician);
    });
};

// Creates a new politician in the DB.
exports.create = function (req, res) {
    Politician.create(req.body, function (err, politician) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(201, politician);
    });
};

// Updates an existing politician in the DB.
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Politician.findById(req.params.id, function (err, politician) {
        if (err) {
            return handleError(res, err);
        }
        if (!politician) {
            return res.send(404);
        }
        var updated = _.merge(politician, req.body);
        updated.save(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, politician);
        });
    });
};

// Deletes a politician from the DB.
exports.destroy = function (req, res) {
    Politician.findById(req.params.id, function (err, politician) {
        if (err) {
            return handleError(res, err);
        }
        if (!politician) {
            return res.send(404);
        }
        politician.remove(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.send(204);
        });
    });
};

function handleError(res, err) {
    return res.send(500, err);
}