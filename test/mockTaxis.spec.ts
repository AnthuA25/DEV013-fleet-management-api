import { allTaxisService, createTaxiService, taxiByIdService, updateTaxiService,deleteTaxiService } from '../src/services/taxis';

jest.mock('@prisma/client', () => {
    const mockPrisma = {
        taxis: {
            findMany: jest.fn().mockResolvedValue([
                { id: 1, plate: 'KKAA-0000' },
                { id: 2, plate: 'BBHJ-0000' }
            ]),
            findUnique: jest.fn().mockResolvedValue([{ id: 3, plate: 'AAOP-0000' }]),
            create: jest.fn().mockResolvedValue({ id: 4, plate: 'CNCA-0000' }),
            update: jest.fn().mockResolvedValue({ id: 4, plate: 'CNKO-0000' }),
            delete:jest.fn().mockResolvedValue({ id: 4, plate: 'CNKO-0000' })
        },
    };
    return {
        PrismaClient: jest.fn(() => mockPrisma),
    }
})

describe('getAllTaxis', () => {
    it('return all taxis', async () => {
        const skip = 2;
        const take = 4;

        const result = await allTaxisService(skip, take);

        expect(result).toEqual([
            { id: 1, plate: 'KKAA-0000' },
            { id: 2, plate: 'BBHJ-0000' }
        ]);

    });
});

describe('getTaxiById', () => {
    it('return taxi by Id', async () => {
        const taxiId = 3;

        const result = await taxiByIdService(taxiId);

        expect(result).toEqual([
            { id: 3, plate: 'AAOP-0000' }
        ]);

    });

    // it('return null when an invalid taxiId is provided', async () => {
    //     const taxiId = 777;

    //     const result = await taxiByIdService(taxiId);
    //     console.log("🚀 ~ it ~ result:", result)

    //     expect(result).toBeFalsy();

    // });
})

describe('postTaxi', () => {
    it('create new taxi', async () => {

        const id = 4;
        const plate = 'CNCA-0000';
        const newTaxi = {
            id: 4,
            plate: 'CNCA-0000',
        };

        const result = await createTaxiService(id, plate);
        // console.log("🚀 ~ it ~ resul3t:", result)

        expect(result).toEqual(newTaxi);
    });

    // it('should throw an error when ID is negative', async () => {
    //     // Arrange
    //     const id = -1;
    //     const plate = 'CNCA-0000';

    //     const result =  await createTaxiService(id, plate);
    //     expect(result).rejects.toThrow('El ID del taxi debe ser un número positivo');
    // });
})

describe('updateTaxi', () => {
    it('Update a Taxi', async () => {
        const taxiId = 4;
        const updateData = {plate: "CNKO-0000"};
        const result = await updateTaxiService(taxiId, updateData);
        
        expect(result).toEqual({ id: 4, plate: 'CNKO-0000' });
    });
})

describe('deleteTaxi',() =>{
    it('Delete a Taxi',async ()=>{
        const taxiId='4';
       const deletTaxi={ id: 4, plate: 'CNKO-0000' };
       const response=await deleteTaxiService(taxiId);
      //console.log("response",response);
       expect(response).toEqual(deletTaxi);
    });
})