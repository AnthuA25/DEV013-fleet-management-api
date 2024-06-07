import prisma from "../utils/db";

export const allTaxisService = async (skip: number, take: number): Promise<ITaxi[]> => {
    const allTaxis = await prisma.taxis.findMany({
        skip: skip,
        take: take,
    });
    return allTaxis;
};

export const taxiByIdService = async (id: number): Promise<any> => {
    const getId = await prisma.taxis.findUnique({
        where: {
            id: id
        }
    });
    return getId;
};

export const createTaxiService = async (id: number, plate: string): Promise<any> => {

    const newTaxi = await prisma.taxis.create({
        data: {
            id, plate
        }
    });
    return newTaxi;
};

export const updateTaxiService = async (id: number, update: any): Promise<any> => {
    const updateTaxi = await prisma.taxis.update({
        where: { id: id },
        data: update
    });
    return updateTaxi;
};

export const deleteTaxiService = async (id: string): Promise<any> => {
    const taxiId = parseInt(id);
    const deleteTaxi = await prisma.taxis.delete({ where: { id: taxiId } });
    return deleteTaxi;
}

export interface ITaxi {
    id: number
    plate: string | null
}

export interface IPaginated {
    skip?: number
    take?: number
}

