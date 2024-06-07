"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const trajectoriesController_1 = require("../controller/trajectoriesController");
const router = express_1.default.Router();
/**
 * Get track
 * @openapi
 * /trajectories:
 *    get:
 *      tags:
 *        - Trajectories
 *      summary: "Obtener todas las trayectorias"
 *      description: Este endpoint es para obtener trayectorias
 *      parameters:
 *        - in: query
 *          name: skip
 *          schema:
 *            type: integer
 *            minimum: 1
 *          description: Número de página que se desea obtener
 *        - in: query
 *          name: take
 *          schema:
 *            type: integer
 *            minimum: 1
 *            maximum: 100
 *            default: 10
 *          description: Número máximo de resultados por página
 *      responses:
 *        '200':
 *          description: Operación exitosa.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Trajectories'
 */
router.get("/trajectories", trajectoriesController_1.TrajectoriesController.getAllTrajectories);
/**
 * Get track
 * @openapi
 * /count:
 *    get:
 *      tags:
 *        - Trajectories
 *      summary: "Obtener cuantas trayectorias hay por taxi"
 *      description: Este endpoint es para obtener cuantas trayectorias hay por taxi
 *      responses:
 *        '200':
 *          description: Operación exitosa.Devuelve el recuento de trayectorias para cada taxi.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          taxiId:
 *                              type: integer
 *                              description: "Id del taxi"
 *                              default: 10133
 *                          count:
 *                              type: integer
 *                              description: "Número de trayectorias que tiene un taxi"
 *                              default: 1138
 *        '500':
 *          description: Error interno del servidor. Hubo un problema al procesar la solicitud.
 *          content:
 *              application/json:
 *                 schema:
 *                    $ref: '#/components/schemas/Error'
 */
router.get("/count", trajectoriesController_1.TrajectoriesController.getTrajectoriesCount);
/**
 * Get track
 * @openapi
 * /trajectories/{id}:
 *    get:
 *      tags:
 *        - Trajectories
 *      summary: "Buscar trayectoria por Id"
 *      description: "Este endpoint es para buscar trayectoria por Id."
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID de la trayectoria a actualizar
 *          schema:
 *            type: integer
 *      responses:
 *        '200':
 *          description: Operación exitosa. Devuelve el trayectoria buscado.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Trajectories'
 *        '400':
 *          description: Solicitud incorrecta. Puede haber errores en los datos enviados.
 *          content:
 *              application/json:
 *                 schema:
 *                    $ref: '#/components/schemas/Error'
 *        '404':
 *          description: No se ha encontrado el taxi con el ID proporcionado.
 *          content:
 *              application/json:
 *                 schema:
 *                    $ref: '#/components/schemas/Error'
 *        '500':
 *          description: Error interno del servidor. Hubo un problema al procesar la solicitud.
 *          content:
 *              application/json:
 *                 schema:
 *                    $ref: '#/components/schemas/Error'
 */
router.get("/trajectories/:id", trajectoriesController_1.TrajectoriesController.getTrajectoriesById);
/**
 * Get Track
 * @openapi
 * /location/{id}:
 *   get:
 *     tags:
 *       - Trajectories
 *     summary: "Obtener historial de ubicaciones por ID de taxi y fecha"
 *     description: "Este endpoint obtiene el historial de ubicaciones de un taxi para una fecha específica."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "ID del taxi para el cual se desea obtener el historial de ubicaciones."
 *         schema:
 *           type: integer
 *       - in: query
 *         name: date
 *         required: true
 *         description: "Fecha para la cual se desea obtener el historial de ubicaciones del taxi."
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       '200':
 *         description: "Operación exitosa. Devuelve el historial de ubicaciones del taxi para la fecha especificada."
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   latitude:
 *                     type: number
 *                     description: "Latitud de la ubicación."
 *                   longitude:
 *                     type: number
 *                     description: "Longitud de la ubicación."
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     description: "Fecha y hora de la ubicación."
 *       '400':
 *         description: "Solicitud incorrecta. Puede haber errores en los datos enviados."
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '500':
 *         description: "Error interno del servidor. Hubo un problema al procesar la solicitud."
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/location/:id", trajectoriesController_1.TrajectoriesController.getLocationHistory);
// /**
//  * Post Trajectories
//  * @openapi
//  * /trajectories:
//  *    post:
//  *      tags:
//  *        - Trajectories
//  *      summary: "Crear nueva trayectoria"
//  *      description: Este endpoint permite agregar una nueva trayectoria manualmente.
//  *      requestBody:
//  *        required: true
//  *        content:
//  *          application/json:
//  *            schema:
//  *               $ref: '#/components/schemas/Trajectories'
//  *      responses:
//  *        '201':
//  *          description: Operación exitosa. Devuelve la nueva trayectoria creada.
//  *          content:
//  *            application/json:
//  *              schema:
//  *                $ref: '#/components/schemas/Trajectories'
//  *        '400':
//  *          description: Solicitud incorrecta. Puede haber errores en los datos enviados.
//  *          content:
//  *              application/json:
//  *                 schema:
//  *                    $ref: '#/components/schemas/Error'
//  *        '500':
//  *          description: Error interno del servidor. Hubo un problema al procesar la solicitud.
//  *          content:
//  *              application/json:
//  *                 schema:
//  *                    $ref: '#/components/schemas/Error'
//  */
// router.post("/trajectories", TrajectoriesController.postTrajectories);
// router.put("/trajectories/:id", TrajectoriesController.putTrajectoryById);
/**
 * Get track
 * @openapi
 * /lastLocation:
 *    get:
 *      tags:
 *        - Trajectories
 *      summary: "Obtener la última ubicación de los taxis"
 *      description: Este endpoint es para obtener la última ubicación de los taxis
 *      parameters:
 *        - in: query
 *          name: skip
 *          required: true
 *          schema:
 *            type: integer
 *            minimum: 1
 *          description: Número de página que se desea obtener
 *        - in: query
 *          name: take
 *          required: true
 *          schema:
 *            type: integer
 *            minimum: 1
 *            maximum: 100
 *            default: 10
 *          description: Número máximo de resultados por página
 *      responses:
 *        '200':
 *          description: Operación exitosa.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              taxiId:
 *                                  type: integer
 *                                  description: "Id del taxi"
 *                                  default: 6598
 *                              date:
 *                                  type: string
 *                                  format: date-time
 *                                  description: "Fecha y hora de la ubicación"
 *                              latitude:
 *                                  type: number
 *                                  description: "Latitud de la ubicación"
 *                                  default: 116.32706
 *                              longitude:
 *                                  type: number
 *                                  description: "Longitud de la ubicación"
 *                                  default: 39.84801
 */
router.get("/lastLocation", trajectoriesController_1.TrajectoriesController.getLastLocation);
// /**
//  * Delete track
//  * @openapi
//  * /trajectories/{id}:
//  *    delete:
//  *      tags:
//  *        - Trajectories
//  *      summary: "Eliminar una trayectoria existente por su ID"
//  *      description: "Este endpoint permite eliminar una trayectoria existente según su ID."
//  *      parameters:
//  *        - in: path
//  *          name: id
//  *          required: true
//  *          description: ID del trayectoria a eliminar
//  *          schema:
//  *            type: integer
//  *      responses:
//  *        '200':
//  *          description: Trayectoria eliminado correctamente.
//  *        '404':
//  *          description: No se ha encontrado un trayectoria con el ID proporcionado.
//  *        '500':
//  *          description: Error interno del servidor. Hubo un problema al procesar la solicitud.
//  */
// router.delete(
//   "/trajectories/:id",
//   TrajectoriesController.deleteTrajectoriesById
// );
router.get("/exportExcel", trajectoriesController_1.TrajectoriesController.getExportExcel);
exports.default = router;
