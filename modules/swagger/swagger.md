# Swagger Related Notes

Navigate to the baseURL and you will be redirected to the swagger documents in the swagger-node-express module.

We are currently using two modules for swagger:

    "swagger-node-express": "darrin/swagger-node-express",
    "swagger-validation": "~1.2"

The 'darrin' module above applies a patch that allows us to install the 'swagger-validation' module as middleware to validate every incoming API request. It also dynamically determines the api url so you can serve up the swagger-ui without modifying these files.

The current swagger modules have not been ported to express 4.x so we're currently restricted to the use of express 3.x.

# References
[Documenting your Spring API with Swagger](http://raibledesigns.com/rd/entry/documenting_your_spring_api_with)