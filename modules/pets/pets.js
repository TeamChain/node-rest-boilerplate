module.exports = function (swagger) {
    'use strict';
    var exports = {};
    var param = swagger.params;
    var swe = swagger.errors;
    var petData = require('./petService');
    var url = require('url');
    var resourcePath = '/pets';

// the description will be picked up in the resource listing
    exports.findById = {
        'spec': {
            description: 'Operations about pets',
            path: resourcePath + '/{petId}',
            method: 'GET',
            summary: 'Find pet by ID',
            notes: 'Returns a pet based on ID',
            type: 'Pet',
            nickname: 'getPetById',
            produces: ['application/json'],
            parameters: [param.path('petId', 'ID of pet that needs to be fetched', 'integer')],
            responseMessages: [swe.invalid('id'), swe.notFound('pet')]
        },
        'action': function (req, res) {
            var pet = petData.getPetById(req.params.petId);
            if (pet) {
                res.send(JSON.stringify(pet));
            }
            else {
                throw swe.notFound('pet', res);
            }
        }
    };

    exports.findByStatus = {
        'spec': {
            path: resourcePath + '/findByStatus',
            notes: 'Multiple status values can be provided with comma-separated strings',
            summary: 'Find pets by status',
            method: 'GET',
            parameters: [
                param.query('status', 'Status in the store', 'string', true, ['available', 'pending', 'sold'], 'available')
            ],
            type: 'array',
            items: {
                $ref: 'Pet'
            },
            responseMessages: [swe.invalid('status')],
            nickname: 'findPetsByStatus'
        },
        'action': function (req, res) {
            var statusString = url.parse(req.url, true).query.status;
            var output = petData.findPetByStatus(statusString);
            res.send(JSON.stringify(output));
        }
    };

    exports.findByTags = {
        'spec': {
            path: resourcePath + '/findByTags',
            notes: 'Multiple tags can be provided with comma-separated strings. Use tag1, tag2, tag3 for testing.',
            summary: 'Find pets by tags',
            method: 'GET',
            parameters: [param.query('tags', 'Tags to filter by', 'string', true)],
            type: 'array',
            items: {
                $ref: 'Pet'
            },
            responseMessages: [swe.invalid('tag')],
            nickname: 'findPetsByTags'
        },
        'action': function (req, res) {
            var tagsString = url.parse(req.url, true).query.tags;
            if (!tagsString) {
                throw swe.invalid('tag');
            }
            var output = petData.findPetByTags(tagsString);
            swagger.setHeaders(res);
            res.send(JSON.stringify(output));
        }
    };

    exports.addPet = {
        'spec': {
            path: resourcePath + '',
            notes: 'adds a pet to the store',
            summary: 'Add a new pet to the store',
            method: 'POST',
            parameters: [param.body('Pet', 'Pet object that needs to be added to the store', 'Pet')],
            responseMessages: [swe.invalid('input')],
            nickname: 'addPet'
        },
        'action': function (req, res) {
            var pet = req.body;
            pet.id = undefined;  // to ensure that the POST creates a new pet every time.
            res.send(petData.addPet(pet), 200);
        }
    };

    exports.updatePet = {
        'spec': {
            path: resourcePath + '',
            notes: 'updates a pet in the store',
            method: 'PUT',
            summary: 'Update an existing pet',
            parameters: [param.body('Pet', 'Pet object that needs to be updated in the store', 'Pet')],
            responseMessages: [swe.invalid('id'), swe.notFound('pet'), swe.invalid('input')],
            nickname: 'addPet'
        },
        'action': function (req, res) {
            res.send(petData.addPet(req.body), 200);
        }
    };

    exports.deletePet = {
        'spec': {
            path: resourcePath + '/{id}',
            notes: 'removes a pet from the store',
            method: 'DELETE',
            summary: 'Remove an existing pet',
            parameters: [param.path('id', 'ID of pet that needs to be removed', 'string')],
            responseMessages: [swe.invalid('id'), swe.notFound('pet')],
            nickname: 'deletePet'
        },
        'action': function (req, res) {
            var id = parseInt(req.params.id);
            res.send(JSON.stringify(petData.deletePet(id)), 204);
        }
    };

    var petsModel = require('./pets-model.schema.json');
    var petResources = exports;
    swagger.addModels({ models: petsModel})
        .addGet(petResources.findByTags)    // - /pet/findByTags
        .addGet(petResources.findByStatus)  // - /pet/findByStatus
        .addGet(petResources.findById)      // - /pet/{petId}
        .addPost(petResources.addPet)
        .addPut(petResources.updatePet)
        .addDelete(petResources.deletePet);

};
