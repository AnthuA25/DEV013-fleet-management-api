import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
    openapi: "3.0.0",
    info: {
        title: "Documentacion Fleet Management api",
        version: "1.0.0",
    },
    servers: [
        {
            url: "http://localhost:3000",
        },
    ],
    components: {
        // securitySchemes: {
        //   bearerAuth: {
        //     type: "http",
        //     scheme: "bearer",
        //   },
        // },
        schemas: {
            Taxis: {
                type: "object",
                // required: ["plate"],
                properties: {
                    id: {
                        type: "integer"
                    },
                    plate: {
                        type: "string",
                    },
                },
            },
            Trajectories: {
                type: "object",
                // required: ["date", "latitude","longitude"],
                properties: {
                    id: {
                        type: "integer",
                    },
                    taxi_id:{
                        type: "integer",
                    },
                    date: {
                        type: "string"
                    },
                    latitude: {
                        type: "double"
                    },
                    longitude: {
                        type: "double"
                    },
                },
            },
        },
    },
};

const swaggerOptions: OAS3Options = {
    swaggerDefinition,
    apis: ["./src/routes/*.ts"],
};

export default swaggerJSDoc(swaggerOptions);