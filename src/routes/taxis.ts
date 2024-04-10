import { Router } from 'express';
import { TaxisController } from '../controller/taxis';

const router: Router = Router();

/**
 * Post track
 * @openapi
 * /taxis:
 *    get:
 *      tags:
 *        - taxis
 *      summary: "Obtener taxis"
 *      description: Este endpoint es para obtener los taxis  
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


router.get('/', TaxisController.getAllTaxis);

export default router;