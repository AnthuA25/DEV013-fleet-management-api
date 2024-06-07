import { Router } from 'express';
import { TaxisController } from '../controller/taxisController';

const router: Router = Router();

/**
 * Get track
 * @openapi
 * /taxis:
 *    get:
 *      tags:
 *        - Taxis
 *      summary: "Obtener taxis"
 *      description: Este endpoint es para obtener taxis
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
 *                          $ref: '#/components/schemas/Taxis'
 */

router.get('/taxis', TaxisController.getAllTaxis);


/**
 * Get track
 * @openapi
 * /location:
 *    get:
 *      tags:
 *        - Taxis
 *      summary: "Obtener latitud, longitud y fecha de cada taxi"
 *      description: Este endpoint es para obtener latitud, longitud y fecha de cada taxi 
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
 *          description: Operación exitosa. Devuelve el historial de ubicaciones de los taxis.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: integer
 *                      description: "Id del taxi"
 *                      default: 6598
 *                    plate:
 *                      type: string 
 *                      description: "Placa del taxi"
 *                      default: "FHLB-7962"
 *                    Trajectories:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          latitude:
 *                            type: number
 *                            description: "Latitud de la ubicación"
 *                          longitude:
 *                            type: number
 *                            description: "Longitud de la ubicación"
 *                          date:
 *                            type: string
 *                            format: date-time
 *                            description: "Fecha y hora de la ubicación"
 *        '500':
 *          description: Error interno del servidor. Hubo un problema al procesar la solicitud.
 *          content:
 *              application/json:
 *                 schema:
 *                    $ref: '#/components/schemas/Error'
 */

// router.get('/location', TaxisController.getLocationHistory);

/**
 * Get track
 * @openapi
 * /taxis/{id}:
 *    get:
 *      tags:
 *        - Taxis
 *      summary: "Buscar taxi por Id"
 *      description: "Este endpoint es para buscar taxi por Id."
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID del taxi a buscar
 *          schema:
 *            type: integer
 *      responses:
 *        '200':
 *          description: Operación exitosa. Devuelve el taxi buscado.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Taxis'
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
router.get('/taxis/:id', TaxisController.getTaxiById);

/**
 * Post Taxi
 * @openapi
 * /taxis:
 *    post:
 *      tags:
 *        - Taxis
 *      summary: "Crear taxis"
 *      description: Este endpoint permite crear taxis.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *               $ref: '#/components/schemas/Taxis'
 *      responses:
 *        '201':
 *          description: Taxi creado exitosamente.
 */
router.post('/taxis', TaxisController.postTaxi);

/**
 * Put track
 * @openapi
 * /taxis/{id}:
 *    put:
 *      tags:
 *        - Taxis
 *      summary: "Actualizar un taxi existente"
 *      description: "Este endpoint es para actualizar un taxi existente."
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID del taxi a actualizar
 *          schema:
 *            type: integer
 *      requestBody:
 *        description: Datos actualizados del taxi
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Taxis'
 *      responses:
 *        '200':
 *          description: Operación exitosa. Devuelve el taxi actualizado.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Taxis'
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

router.put('/taxis/:id', TaxisController.putTaxiById);

/**
 * Delete track
 * @openapi
 * /taxis/{id}:
 *    delete:
 *      tags:
 *        - Taxis
 *      summary: "Eliminar un taxi existente por su ID"
 *      description: "Este endpoint permite eliminar un taxi existente según su ID."
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID del taxi a eliminar
 *          schema:
 *            type: integer
 *      responses:
 *        '200':
 *          description: Taxi eliminado correctamente.
 *        '404':
 *          description: No se ha encontrado un taxi con el ID proporcionado.
 *        '500':
 *          description: Error interno del servidor. Hubo un problema al procesar la solicitud.
 */

router.delete('/taxis/:id', TaxisController.deleteByTaxi)


export default router;