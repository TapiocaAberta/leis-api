/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Law = require('../api/law/law.model');
var Politician = require('../api/politician/politician.model');

Law.find({}).remove(function () {
    Law.create(
        {
            name: "Law1",
            info: "Law test info",
            active: true
        }
        , function () {
            console.log('finished populating laws');
        }
    );
});

Politician.find({}).remove(function () {
    Politician.create(
        {
            name: "Politician1",
            info: "Politician test info",
            active: true
        }
        , function () {
            console.log('finished populating Politician');
        }
    );
});

User.find({}).remove(function () {
    User.create({
            provider: 'local',
            name: 'Test User',
            email: 'test@test.com',
            password: 'test'
        }, {
            provider: 'local',
            role: 'admin',
            name: 'Admin',
            email: 'admin@admin.com',
            password: 'admin'
        }, function () {
            console.log('finished populating users');
        }
    );
});