import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
    openapi: "3.0.0",
    info: {
        title: "Documentacion Fleet Management api",
        version: "1.0.0",
    },
    servers: [
        {
            url: "http://localhost:8000",
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
                        type: "integer",
                        example: 9275
                    },
                    plate: {
                        type: "string",
                        example: "ENPB-7532"
                    },
                },
            },
            Trajectories: {
                type: "object",
                // required: ["date", "latitude","longitude"],
                properties: {
                    id: {
                        type: "integer",
                        format: "int64",
                        description: "ID de la trajectoria",
                        example: 22237
                    },
                    taxi_id: {
                        type: "integer",
                        description: "ID de taxi elacionado con esta trayectoria",
                        format: "int64",
                        example: 9275
                    },
                    date: {
                        type: "string",
                        format: "date-time",
                        example: "2008-02-02 17:15:21"
                    },
                    latitude: {
                        type: "double",
                        description: "Latitud de la posición",
                        format: "int64",
                        example: 116.27741
                    },
                    longitude: {
                        type: "double",
                        description: "Longitud de la posición",
                        format: "int64",
                        example: 39.89958
                    },
                },
            },
            Error: {
                type: "object",
                properties: {
                    message: {
                        type: "string",
                        description: "Mensaje de error"
                    }
                }
            }
        },
    },
};

const swaggerOptions: OAS3Options = {
    swaggerDefinition,
    apis: ["./src/routes/*.ts"],
};

export default swaggerJSDoc(swaggerOptions);