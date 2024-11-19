import request from 'supertest';
import app from '../../src/index';


describe('GET /trajectories', () => {
    it('should return 400 when skip or take are missing', async () => {
        const response = await request(app).get('/trajectories');
        expect(response.status).toBe(400);
    });

    it('should return 200 when skip and take parametes are provided', async () => {
        const response = await request(app).get('/trajectories').query({ skip: 0, take: 10 });
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length > 0).toBeTruthy();
    });

    it('should respond with and id inside the body response', async () => {
        const response = await request(app).get("/trajectories").query({ skip: 0, take: 1 });
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0]).toHaveProperty('id');
        expect(typeof response.body[0].id).toBe('number');
    });
    it('should respond with a date, latitude and longitude inside the body response', async () => {
        const response = await request(app).get("/trajectories").query({ skip: 0, take: 1 });
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0]).toHaveProperty('date');
        expect(response.body[0]).toHaveProperty('latitude');
        expect(response.body[0]).toHaveProperty('longitude');
        expect(typeof response.body[0].date).toBe('string');
        expect(typeof response.body[0].latitude).toBe('number');
        expect(typeof response.body[0].longitude).toBe('number');
    });
    it('should respond with 10 trajectories as result', async () => {
        const response = await request(app).get('/trajectories').query({ skip: 0, take: 10 });
        expect(response.body).toHaveLength(10)
    });
})

describe('GET /count', () => {
    it('should return 200 ', async () => {
        const response = await request(app).get(`/count`);
        expect(response.status).toBe(200);
    });
})

describe('GET /location', () => {
    it('should return 200 when there is a specific  id taxi and specific date', async () => {
        const taxiId = 6418;
        const date = '2008-02-02'
        const response = await request(app).get(`/location/${taxiId}?date=${date}`);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
    it('should respond with a latitude,longitude and date inside the body response', async () => {
        const response = await request(app).get(`/location/6418?date='2008-02-02'`);
        // console.log('f', response.body[0])
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0]).toHaveProperty('latitude');
        expect(typeof response.body[0].latitude).toBe('number');
        expect(response.body[0]).toHaveProperty('longitude');
        expect(typeof response.body[0].longitude).toBe('number');
        expect(response.body[0]).toHaveProperty('date');
        expect(typeof response.body[0].date).toBe('string');
      });
});

describe('GET /trajectories/:id', () => {
    it('should return 200 when an existing id is entered', async () => {
        const id = 3620267
        const response = await request(app).get(`/trajectories/${id}`);
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(id);
        expect(response.body.latitude).toBe(116.35926);
    });

    it('should return 404 if the trajectories ID is not found',async() =>{
        const  invalid_id=123456;
        const response = await request(app).get(`/trajectories/${invalid_id}`);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('El id de la trayectoria no se encontró');

    })
});

describe('GET /lastLocation', () => {
    it('should return 400 when skip or take are missing', async () => {
        const response = await request(app).get(`/lastLocation`);
        expect(response.status).toBe(400);
    });

    it('should return 200 when skip and take parametes are provided',async() =>{
        const response = await request(app).get(`/lastLocation?skip=1&take=1`);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length > 0).toBeTruthy();
    });

    it('should respond with a date inside the body response', async () => {
        const response = await request(app).get("/lastLocation").query({ skip: 0, take: 1 });
        // console.log('f', response.body[0])
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0]).toHaveProperty('latitude');
        expect(typeof response.body[0].latitude).toBe('number');
        expect(response.body[0]).toHaveProperty('longitude');
        expect(typeof response.body[0].longitude).toBe('number');
        expect(response.body[0]).toHaveProperty('date');
        expect(typeof response.body[0].date).toBe('string');
      });
});

describe('GET /exportExcel', () => {
    it('you must send an e-mail with an Excel attachment containing the location data', async () => {
        const response = await request(app).get(`/exportExcel`).query({ taxiId: 'GHGH-1458', date: '2008-02-02' });;
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Correo electrónico enviado con éxito');
    });
})

