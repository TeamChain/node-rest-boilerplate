# Overview

This is a re-envisioned 'pets' module. Most of the source comes from the [sample application included within the swagger-node-express npm module](https://github.com/swagger-api/swagger-node-express/tree/master/sample-application).

We wanted to show how we might structure a functional area. In this case we've made 'pets' a module.

To do so and conform to the standard we're shooting for we did a couple things:

1. Show how to have a stand-alone json schema files - so easy with json require support in node-js.
2. Pass in the swagger module so that the module can add all of its own routes rather than having a top level app do that.
3. Show how to structure the package.json so that we can name the main 'pets' file in line with our standard.