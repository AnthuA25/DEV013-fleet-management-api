import { group } from 'console';
import { allTrajectoriesServices, countTrajectoriesService, lastLocationService, locationService, trajectoryByIdService} from '../src/services/trajectories'

jest.mock('@prisma/client', () => {
    const mockPrisma = {
        trajectories: {
            findMany: jest.fn().mockResolvedValue([
                { id: 1, taxiId: 23, date: '2008-02-02 14:22:40', latitude: 116.30508, longitude: 39.96525 },
                { id: 2, taxiId: 24, date: '2008-02-06 14:22:40', latitude: 116.30509, longitude: 39.86525 }
            ]),
            groupBy: jest.fn().mockResolvedValue([
                { _count: 1138, taxiId: 10133 },
                { _count: 1701, taxiId: 6598 },
            ]),
            // $queryRaw: jest.fn().mockResolvedValue([
            //     { id: 1, date: '2008-02-02 14:22:40', latitude: 116.30508, longitude: 39.96525 },
            //     { id: 2, date: '2008-02-06 14:22:40', latitude: 116.30509, longitude: 39.86525 }
            // ]),
            findUnique: jest.fn().mockResolvedValue([{ id: 2, date: '2008-02-06 14:22:40', latitude: 116.30509, longitude: 39.86525 }])
        },
    };
    return {
        PrismaClient: jest.fn(() => mockPrisma),
    }
})

describe('getAllTrajectories', () => {
    it('return all trajectories', async () => {
        const skip = 1;
        const take = 2;

        const result = await allTrajectoriesServices(skip, take);
        expect(result).toEqual([
            { id: 1, taxiId: 23, date: '2008-02-02 14:22:40', latitude: 116.30508, longitude: 39.96525 },
            { id: 2, taxiId: 24, date: '2008-02-06 14:22:40', latitude: 116.30509, longitude: 39.86525 }
        ]);
    });
});
describe('getCounTrajectories', () => {
    it('return taxi by Id', async () => {

        const result = await countTrajectoriesService();

        expect(result).toEqual([
            { _count: 1138, taxiId: 10133 },
            { _count: 1701, taxiId: 6598 },
        ]);

    });
});

describe('getLocation', () => {
    it('return location history  of a specific taxi', async () => {
        const taxiId = 1013;
        const date = new Date('2022-04-01');
        const result = await locationService(taxiId, date);
        // console.log("🚀 ~ it ~ result:", result)
        expect(result).toEqual([
            { id: 1, taxiId: 23, date: '2008-02-02 14:22:40', latitude: 116.30508, longitude: 39.96525 },
            { id: 2, taxiId: 24, date: '2008-02-06 14:22:40', latitude: 116.30509, longitude: 39.86525 }
        ]);
    })
})

// describe('getLastLocation',() =>{
//     it('return the last location',async ()=>{
//         const skip = 0;
//         const take = 1;

//         const result = await lastLocationService(skip,take);
//         expect(result).toEqual([
//             { id: 1, date: '2008-02-02 14:22:40', latitude: 116.30508, longitude: 39.96525 },
//                 { id: 2, date: '2008-02-06 14:22:40', latitude: 116.30509, longitude: 39.86525 }
//         ]);
//     })
// })

describe('getByIdTrajectory', () => {
    it('return id taxi',async()=>{
        const id =2;
        
        const result = await trajectoryByIdService(id);
        // console.log("🚀 ~ it ~ result:", result)

        expect(result).toEqual([{ id: 2, date: '2008-02-06 14:22:40', latitude: 116.30509, longitude: 39.86525 }])
        

    })
})

