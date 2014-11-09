<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Introduction](#introduction)
  - [Motivation](#motivation)
  - [Objectives](#objectives)
  - [Current Solution](#current-solution)
    - [Components](#components)
    - [Modules](#modules)
      - [/swagger](#swagger)
      - [/modules/auth/facebook](#modulesauthfacebook)
      - [/modules/pets](#modulespets)
  - [Recommendations](#recommendations)
    - [File Structure](#file-structure)
    - [Libraries](#libraries)
- [Getting Started](#getting-started)
  - [Quick and Dirty](#quick-and-dirty)
  - [Tips on binding the boilerplate from to your git repo](#tips-on-binding-the-boilerplate-from-to-your-git-repo)
    - [Option 1: Allowing for rebase from boilerplate](#option-1-allowing-for-rebase-from-boilerplate)
    - [Option 2: Completely independent from boilerplate](#option-2-completely-independent-from-boilerplate)
  - [Recommended Development Workflow](#recommended-development-workflow)
- [Project Directory Structure](#project-directory-structure)
  - [Full Development Structure](#full-development-structure)
    - [Modules](#modules-1)
      - [package.json](#packagejson)
    - [Complex Modules](#complex-modules)
      - [Sub-Modules](#sub-modules)
    - [Services](#services)
  - [Shared Functions and Libraries](#shared-functions-and-libraries)
  - [Scripts](#scripts)
    - [start](#start)
- [Examples](#examples)
  - [/pets](#pets)
- [Swagger Documents](#swagger-documents)
  - [/api-docs/pets](#api-docspets)
  - [Swagger Implementation Details](#swagger-implementation-details)
- [Help me improve this](#help-me-improve-this)
  - [Future Work](#future-work)
  - [Contributions](#contributions)
- [References](#references)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Introduction

The primary objective of this project is to have a complete "best practice" boilerplate project for a RESTful nodeJS server (including Facebook authentication) up and running within seconds.

This project is runnable out of the box - see [Getting Started](#getting-started) - assuming the default ports we've chosen to run the app on are not taken.

## Motivation

My first project was done as part of an post-interview coding exercise. I was amazed at how quickly it came together compared to Java which I've been developing in for a LONG time. However there were things I had to do almost immediately to make myself more productive and things I didn't have time to do the right way - e.g. grunt, jshint, etc. What's more there were a number of things I stumbled across by trial and error that prevented me from just building my RESTful service right off not to mention documenting them the way I thought they should be.

Some of the things that slowed me down is the fact that there's competition (YAY!) in this ecosystem which makes it a bit difficult to figure out which solution to use for any given problem. I found myself doing a bunch of pro/con analysis which slowed me down quite a bit.  What's more it's sometimes hard to tell which pieces work together since many projects are in active development. In some cases I needed to pull changes from forks of active projects or apply changes from stackoverflow to get this working.

Most of these 'complaints' are actually benefits but I was looking for something a bit more opinionated. There do seem to be some commercial ventures out there looking to do what I was looking for but I end up being uneasy when I settle on commercial foundations - do they have my best interests in mind. Perhaps someone has already done something like what I've done here - that would be fantastic - please point me to it!

## Objectives

Let's get specific about what I'm attempted to do here.  The focus is to find components that work together to build the foundation for a service that can:

1. Provide easily implemented and understandable RESTful endpoints.
2. Documentation that is part of the work and evolves with the code and is accessible with the service.
3. Setup to optimize for developer productivity.
4. Facilitates real time feedback and continuous integration via static code analysis and testing.
5. Uses best of class tools and components where possible.
6. Develop in a modular way - grouping by feature rather than file type.
7. Accommodates development, test, production builds.
8. Would allow me or others to begin work on the interesting part of RESTful services within minutes of 'git clone'.

## Current Solution

There are lots of off the shelf components to help us achieve our objectives - as mentioned this is part of the problem. Components and tools are not enough though - we need some conventions and processes.  Regardless - I know there's room for improvement. I consider this a baseline from which things can only get better. I'd love to hear about ways to improve what I've done here with the above objectives in mind. Feel free to suggest new objectives as well.

### Components

See the package.json for full details but here some worth highlighting:

1.  express (3.x) - I wanted to use 4.x but the swagger modules (below) don't appear to support 4.x yet.
2.  swagger-node-express (forked) - although I considered swagger-jack, this is the most active swagger branch - patched to allow swagger-validation (below) to be integrated.
3.  swagger-validation - nicely leverages our swagger definitions during validation.
4.  swagger-ui (forked) - embedding it means we don't need to mess with CORs - patched to dynamically build the apiUrl.
5.  config - allows us to easily provide a default configuration as well as overrides for development, production, etc.
6.  grunt - for task automation, build, etc... If you're not using it... you're probably wasting lots of time.
7.  jshint - setup to automatically re-inspect javascript files as they change.
8.  jasmine_node - setup to automatically kick off jasmine tests as files change.
9.  nodemon - to restart the server as we make changes.
10. intellij - my preferred IDE but you can get rid of the .iml and .idea/ files if you wish.
11. passport - for authentication.
12. passport-facebook - to demonstrate facebook authentication.

### Modules

#### /swagger

Where we've setup swagger.

#### /modules/auth/facebook

Facebook authentication via passport. Note that /auth/facebook is published as an endpoint through swagger and other endpoints are not published since they're used as intermediate redirects.

#### /modules/pets

The normal swagger 'pet' endpoint translated to this solution.

## Recommendations

### File Structure

Beyond the components we're working to develop a standard structure and process to help us be productive. Specifically we want it to be obvious where we should locate development artifacts.

The following concepts are reflected in the file structure which is described in far more detail below:

1. modules - where you can find groupings of files divided by major feature areas.
2. services - where you can find long running entities and generally used by more than one module.
3. config - where you can find configurations for a variety of different run-times.
4. tests - where our tests are located.
5. bin - where scripts are located.
6. node_modules - where node installs stuff.
7. build - where build artifacts will be placed.

Be warned this may evolve a bit over time...

### Libraries

In order to promote standardization every 3rd party library should be installed as a node module. There are probably lots of great reasons to do this. In addition to allowing us to standardize on a package manager it allows us to version control the versions of libraries in our package.json. We'll see if anyone challenges this notion.

There's an open question as to whether we will need a place to put internal libraries somewhere other than services and modules directories.  My initial answer to this is use modules for internal libraries.  This could potentially cloud what modules are providing our RESTful API vs which are providing internal shared functions. If authors of RESTful services want this to be clear my suggestion is to use a sub-module structure to help clarify this - e.g. 'modules/api/'.

# Getting Started

## Quick and Dirty
In short - you'll just need to clone the repo, install libraries and start:

    git clone -o rest-boilerplate -- git@github.com:darrin/node-rest-boilerplate.git myApi
    cd myApi
    npm install  # install modules
    npm start    # start the server

You should see something like this:

    $ npm start

    > tot-swagger-express@0.0.1 start /Users/darrin/src/me/tmp/node-rest-boilerplate
    > node ./bin/start-www.js

    setAppHandler is deprecated!  Pass it to the constructor instead.
    Running http server "localhost" on port "3100".
    Running https server "localhost" on port "3443".


Hitting the root http or https locations should redirect you to swagger-ui auto-generated documents.

    http://localhost:3100
    https://localhost:3443

Using curl to hit http://localhost:3100/pets/1 should yield:

    $ curl http://localhost:3100/pets/1
    {"id":1,"category":{"id":2,"name":"Cats"},"name":"Cat 1","urls":["url1","url2"],"tags":[{"id":1,"name":"tag1"},{"id":2,"name":"tag2"}],"status":"available"}

## Tips on binding the boilerplate from to your git repo

Obviously you're here bc you'd like to build your own project so you'll want to push changes to your own git repo.

### Option 1: Allowing for rebase from boilerplate

Assuming you want to use git for version control and that you want to use the traditional 'origin' you should create a repository and add it as a remote and then you can push to it.

    git remote add origin <url for remote git repo>
    git push origin master

_We should probably squash history here... quick google search didn't yield a simple answer but would love to add this if someone has a quick dirty way to do it._

### Option 2: Completely independent from boilerplate

Remove the .git directory.  Then follow directions from your git provider on how to push an existing project up to the repo (e.g. 'git init', 'git remote add origin ...', 'git push origin master'.

## Recommended Development Workflow

During development I recommend that you always run the following:

    grunt ci

Here CI stands for continuous integration - and I'm assuming that requires no introduction. This grunt task is setup to continuously monitor for file changes and when detected will run static code analysis (e.g. jshint) on files that have changed as well as run tests.

If you're doing live changes to require interaction with the server to run I recommend running that separately:

    grunt serve

By default this will start up a server in 'development' mode.

# Project Directory Structure

Some considerations we've thought about as we've built out this structure include:

 1. Consistency - so that we know where to find things and are consistent with conventions established elsewhere.
 2. Modular Organization - as much as possible we're trying to organize by functional area so that things related to a feature/function are found together.
 3. Navigable - so that we can navigate easily and find files easily when in an IDE.

Because this is a RESTful service we don't expect to have views, css and images front/center as we would in a normal webapp. Because of this we've eliminated some directories that you might commonly find at the top level.

## Full Development Structure

This is the full file structure including non-production files.  For production some of these files are not necessary (see Dist Structure below).


    ├── Gruntfile.js
    ├── LICENSE.txt
    ├── bin                         // nodeJS scripts
    │   └── start-www.js            // script to start the server.
    ├── config
    │   ├── default.json
    │   └── development.json
    ├── modules                     // where modules go
    │   ├── pets
    │   └── swagger
    ├── node-rest-boilerplate.iml   // intellij project file.
    ├── node_modules                // 3rd party libraries
    ├── package.json                // nodeJS package definition.
    ├── public                      // Static files.
    ├── readme.md                   // This file.
    ├── server.js                   // Main server logic.
    ├── services                    // Where system-wide service live.
    └── tests                       // Where tests live.

We’ve eliminated top level assets, lang and views directories.  Because of this - outside of the 'services' directory mentioned above we've not addressed a place to put common assets, lang and views (again IF we have anything that crosses all modules) - for this I can imagine either having a 'common' or ‘public’ module having assets, lang and views directories.

By default if someone hits our root directory we route people to our swagger docs though we could choose to route to a 'home' module or the like.


### Modules

Different modules contain the logical placement for different routes as well as all of the logic specific to each functional area.


Consider module 'foo' :

    ├── foo
    │   ├── package.json        // package definition.
    │   ├── foo.md              // describes key features that aren't detailed in code.
    │   ├── foo.js              // express routes (controller) as well as main logic specific to the module.
    │   ├── foo_assets/	        // we might house module specific assets here...
    │   ├── foo_lang/		    // i18n
    │   └── foo_views/          // if there are any views generated/returned.


This lets us place all of the logic related to the module in one place. In our case this will include all RESTful routes and related logic in one place.

#### package.json

For the example above we need to tell nodejs where to find the module javascript main file.  That's done via the 'main' parameter in the package.json file as follows:

    {
      "main": "foo.js"
    }


### Complex Modules

In some cases there are families of modules that share a common interface or that we'd otherwise like to group together.

    ├── pets
    │   ├── package.json       // package definition.
    │   ├── cats/              // cats sub-module
    │   ├── dogs/              // dogs sub-module
    │   ├── module.md          // describes key common sub-module features.
    │   ├── module.js          // common top level module.
    │   ├── pets_assets/	   // shared pets assets here...
    │   ├── pets_lang/	       // i18n - shared error / status messages
    │   └── pets_views/        // if there are any shared views.

Here cats and dogs are sub-modules of pets.

#### Sub-Modules

Now delving into the dogs module - we expect to see something like this:

    ├── pets-dogs
    │   ├── package.json       // package definition.
    │   ├── pets-dogs.md       // docs for this module.
    │   ├── pets-dogs.js       // express routes
    │   ├── pets-dogs_assets/  // module specific assets here
    │   ├── pets-dogs_lang/    // i18n
    │   └── pets-dogs_views/   // if there are any module views

### Services

Common services will be located here...

## Shared Functions and Libraries

We recommend that we handle all 3rd party modules using npm.

## Scripts

Are run via [npm run](https://www.npmjs.org/doc/cli/npm-run-script.html)

    npm run <script>

Available scripts include:

### start

Starts the service. We should include some options to change hostname and port but those are not yet present.

# Examples

## /pets

    ├── package.json
    ├── petService.js
    ├── pets-model.schema.json
    ├── pets.js
    └── pets.md

I've taken the swagger prototypical 'pet' example and recast it here to demonstrate our thinking.  In this case I didn't move the 'service' to a the services directory because only 'pets' makes use of it at this point. We don't have assets or views so in this case we just have the files that relate specifically to implementing this service.

# Swagger Documents

Swagger documents are located at /api-docs.

## /api-docs/pets

    curl http://localhost:3100/api-docs/pets

The results look like this (though we've formatted it for clarity below):

    {
        "apiVersion": "0.1",
        "swaggerVersion": "1.2",
        "basePath": "http://localhost:3100",
        "resourcePath": "/pets",
        "apis": [
            {
                "path": "/pets/findByTags",
                "operations": [
                    {
                        "notes": "Multiple tags can be provided with comma-separated strings. Use tag1, tag2, tag3 for testing.",
                        "summary": "Find pets by tags",
                        "method": "GET",
                        "parameters": [
                            {
                                "name": "tags",
                                "description": "Tags to filter by",
                                "type": "string",
                                "required": true,
                                "paramType": "query"
                            }
                        ],

Remember that the in the 'models' attribute is used by swagger-validation to automatically validate responses:

     "models" : {
         "Pet": {
             "id": "Pet",
             "required": [
                 "id",
                 "name"
             ],
             "properties": {
                 "id": {
                     "type": "integer",
                     "format": "int64",
                     "description": "Unique identifier for the Pet",
                     "minimum": "0.0",
                     "maximum": "100.0",
                     "name": "id",
                     "required": true
                 },
                 "category": {
                     "$ref": "Category",
                     "description": "Category the pet is in"
                 },
                 ... details ellided.

In our case the pets-model.schema.json file of the 'pets' module where this comes from...


## Swagger Implementation Details

(See the swagger module for up to date details).

Navigate to the baseURL and you will be redirected to the swagger documents.

The swagger-ui/dist files have been copied into /swagger-ui directory. We did make one modification to make swagger-ui dynamically determine the baseUrl of the site. This technique was pulled from section '4' of [Documenting your Spring API with Swagger](http://raibledesigns.com/rd/entry/documenting_your_spring_api_with).

We are currently using two modules for swagger:

    "swagger-node-express": "darrin/swagger-node-express",
    "swagger-validation": "~1.2"

The 'darrin' module above applies a patch that allows us to install the 'swagger-validation' module as middleware to validate every incoming API request which validates that all parameters as well as POST and PUT bodies.

The current swagger modules have not been ported to express 4.x so we're currently restricted to the use of express 3.x.


# Help me improve this

## Future Work

Lots more we can do here but of particular interest are the following:

1. Use Yeoman - we could probably use this project as a model: http://meanjs.org/generator.html
2. Adding server side OATH and/or HMAC Support
3. Often APIs need a slightly different version of the model for each type of request (PUT, GET, POST)... e.g. in a POST parameters tend to be required but the same parameters are optional in a PUT or PATCH.  Apparently support for this is coming with Swagger 2.0 - we should give this a shot.

## Contributions

Create your own fork of [darrin/node-rest-boilerplate](https://github.com/darrin/node-rest-boilerplate)

To share your changes, [submit a pull request](https://github.com/darrin/node-rest-boilerplate/pull/new/master).


# References

* [Yeoman generator for Enterprise Angular projects.](https://github.com/cgross/generator-cg-angular)
* [Folder Structure for a NodeJS Project](http://stackoverflow.com/questions/5178334/folder-structure-for-a-nodejs-project)
* [A Variety of Folder Structures for NodeJS](https://gist.github.com/lancejpollard/1398757)
* [Building RESTful APIs with Node](http://scottksmith.com/blog/2014/05/02/building-restful-apis-with-node/)
* [Markdown Syntax](http://daringfireball.net/projects/markdown/basics)
* [Exporting Techniques for NodeJS](http://bites.goodeggs.com/posts/export-this/)
* [Documenting your Spring API with Swagger](http://raibledesigns.com/rd/entry/documenting_your_spring_api_with)
* [MEAN.js](http://meanjs.org/generator.html)