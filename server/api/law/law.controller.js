'use strict';

var _ = require('lodash');
var Law = require('./law.model');

// Get list of laws
exports.index = function (req, res) {
    Law.find(function (err, laws) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, laws);
    });
};

// Get a single law
exports.show = function (req, res) {
    Law.findById(req.params.id, function (err, law) {
        if (err) {
            return handleError(res, err);
        }
        if (!law) {
            return res.send(404);
        }
        return res.json(law);
    });
};

// Creates a new law in the DB.
exports.create = function (req, res) {
    Law.create(req.body, function (err, law) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(201, law);
    });
};

// Updates an existing law in the DB.
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Law.findById(req.params.id, function (err, law) {
        if (err) {
            return handleError(res, err);
        }
        if (!law) {
            return res.send(404);
        }
        var updated = _.merge(law, req.body);
        updated.save(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, law);
        });
    });
};

// Deletes a law from the DB.
exports.destroy = function (req, res) {
    Law.findById(req.params.id, function (err, law) {
        if (err) {
            return handleError(res, err);
        }
        if (!law) {
            return res.send(404);
        }
        law.remove(function (err) {
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