import type { Request, Response } from "express";
import { allTaxisService, createTaxiService, deleteTaxiService, taxiByIdService, updateTaxiService,IPaginated } from "../services/taxis";
// import prisma from "../utils/db";


// getTaxis
export const TaxisController = {
    // getAllTaxis
    getAllTaxis: async (req: Request, res: Response) => {
        try {
            const { skip, take }:IPaginated = req.query;
            if (!skip || !take ||isNaN(skip) || isNaN(take) || Number(skip) < 0 || Number(take) < 0) {
                return res.status(400).json({ message: "Los parámetros 'skip' y 'take' deben ser números enteros positivos." });
            }
            const taxis = await allTaxisService(Number(skip), Number(take))
            return res.status(200).json(taxis);
        } catch (error) {
            return res.status(500).json({ message: 'Error en el servidor' })
        }
    },
    getTaxiById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const getId = await taxiByIdService(parseInt(id))
            if (!getId){
                return res.status(404).json({ message: 'El id del taxi no se encontro' });
            } 
            return res.status(200).json(getId);
        } catch (error) {
            return res.status(500).json({ message: 'Error en el servidor' })
        }
    },
    postTaxi: async (req: Request, res: Response) => {
        try {
            const { id, plate } = req.body;
            if(!id  || !plate){
                return  res.status(400).json({message:'No se enviaron los campos necesarios'});
            }
            const existingTaxi = await taxiByIdService(id);
            if(existingTaxi){
                return  res.status(403).json({message:'El taxi ya existe'})
            }
            const newTaxi = await createTaxiService(id,plate)
            return res.status(201).json(newTaxi);
        } catch (error) {
            return res.status(500).json({ message: 'Error en el servidor' })
        }
    },
    putTaxiById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            // const taxiId = parseInt(id);
            if (!Object.keys(req.body).length) {
                return res.status(400).json({ message: 'El cuerpo de la solicitud está vacío.' })
            }
            const existingTaxi = await taxiByIdService(+id);
            if (!existingTaxi) {
                return res.status(404).json({ message: 'No se ha encontrado un taxi con este ID' });
            }
            const taxi = await updateTaxiService(+id,req.body)

            return res.status(200).json(taxi);

        } catch (error) {
            return res.status(500).json({ message: 'Error en el servidor' })
        }
    },
    deleteByTaxi: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
    
            const existingTaxi = await taxiByIdService(+id);
            if (!existingTaxi) {
                return res.status(404).json({ message: 'No se ha encontrado un taxi con este ID' });
            }
            const taxi = await deleteTaxiService(id)
            return res.status(200).json({ message: 'Se ha eliminado correctamente el Taxi', taxi: taxi });
        } catch (error) {
            return res.status(500).json({ message: 'Error en el servidor' })
        }
    },
}
