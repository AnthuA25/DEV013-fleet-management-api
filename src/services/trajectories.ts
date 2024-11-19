import prisma from "../utils/db";
import { LocationHistory,LastLocation, ITrajectory} from "../interface";

export const allTrajectoriesServices = async (skip: number, take: number): Promise<ITrajectory[]> => {
        const trajectories = await prisma.trajectories.findMany({
            skip: skip,
            take: take,
        });
        return trajectories;
}

export const countTrajectoriesService = async ():Promise<ITrajectory[]> =>{
    const countTrajectories = await prisma.trajectories.groupBy({
        by: ['taxiId'],
        _count: true,
    });

    return countTrajectories;
}

export const locationService = async(id:number,date:Date): Promise<LocationHistory[]> =>{
    const endDate = new Date(date);

    endDate.setDate(endDate.getDate() + 1);
    const locationHistory = await prisma.trajectories.findMany({
        where: {
            taxiId: id, 
            date: {
                gte: date,
                lt: endDate
            },
        },
        select: {
            latitude: true,
            longitude: true,
            date: true,
        },
    });
    return locationHistory;
};

export const lastLocationService= async(skip:number, take:number): Promise<LastLocation[]> =>{
    const lastLocation = await prisma.$queryRaw<LastLocation[]>`
            SELECT tax.id, tra.date, tra.latitude, tra.longitude
            FROM "Taxis" tax
            INNER JOIN (
              SELECT taxi_id, date, latitude, longitude,
                     ROW_NUMBER() OVER (PARTITION BY taxi_id ORDER BY date DESC) AS row_num
              FROM "Trajectories"
            ) AS tra ON tax.id = tra.taxi_id AND tra.row_num = 1
            OFFSET ${skip}
            LIMIT ${take} `;
    return lastLocation;
}

export const trajectoryByIdService = async(id: number):Promise<ITrajectory | null> =>{
    const trajectory = await prisma.trajectories.findUnique({ where: { id: id } });
    return  trajectory;
}

