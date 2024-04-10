// import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import prisma from "../db";

// const taxisClient = new PrismaClient().taxis;

// getTaxis
export const TaxisController = {
    getAllTaxis: async (req: Request, res: Response) => {
        try {
            const { skip, take } = req.query;
            const allTaxis = await prisma.taxis.findMany({
                skip: skip ? Number(skip) : undefined,
                take: take ? Number(take) : undefined
            });
            return res.status(200).json(allTaxis);
        } catch (error: any) {
            return res.status(500).json({ message: error.message })
        }
    }
}
