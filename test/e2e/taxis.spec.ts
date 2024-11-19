
import request from 'supertest';
import app from '../../src/index';

describe('GET /taxis', () => {

  it('should return 400 when skip or take are missing', async () => {
    const response = await request(app).get('/taxis');
    expect(response.status).toBe(400);
  });

  it('should return 200 when skip and take parametes are provided', async () => {
    const response = await request(app).get('/taxis').query({ skip: 0, take: 10 });
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    // console.log("🚀 ~ it ~ response.body:", response.body)
    expect(response.body.length > 0).toBeTruthy();
  });

  it('should respond with and id inside the body response', async () => {
    const response = await request(app).get("/taxis").query({ skip: 0, take: 1 });
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty('id');
    expect(typeof response.body[0].id).toBe('number');
  });
  it('should respond with a plate inside the body response', async () => {
    const response = await request(app).get("/taxis").query({ skip: 0, take: 1 });
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty('plate');
    expect(typeof response.body[0].plate).toBe('string');
  });
  it('should respond with 10 taxis as result', async () => {
    const response = await request(app).get('/taxis').query({ skip: 0, take: 10 });
    expect(response.body).toHaveLength(10)
  });

});

describe('GET /taxis/id', () => {
  it("should respond with a status code 404 when taxi id isn't found", async () => {
    const response = await request(app).get('/taxis/0');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('El id del taxi no se encontro')
  })
  it('should return 200 when an existing id is entered', async () => {
    const taxiId = 21;
    const response = await request(app).get(`/taxis/${taxiId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(taxiId);
    expect(response.body.plate).toBe('NNEL-8793');
  });

})


describe('POST/taxis', () => {
  it('should return 201 when create a taxi', async () => {
    const newTaxi = {
      id: 2,
      plate: 'NNEF-6666',
    };
    const response = await request(app).post('/taxis').send(newTaxi);
    expect(response.status).toBe(201);
    expect(response.body.id).toBe(2);
    expect(response.body.plate).toBe('NNEF-6666');
  });

  it('should return 400 if id or plate is missing', async () => {
    const response = await request(app).post('/taxis').send({});
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('No se enviaron los campos necesarios');
  });

  it('should return 403 if taxi already exists', async () => {
    const response = await request(app).post('/taxis').send({
      id: 2,
      plate: 'NNEF-6666',
    });
    expect(response.status).toBe(403);
    expect(response.body.message).toBe('El taxi ya existe');
  })

})
describe('PUT/taxis/id', () => {
  it('should return 200 status code and update existing taxi ', async () => {
    const update = { plate: 'XYZA-2789' };
    const response = await request(app).put('/taxis/2').send(update);
    expect(response.status).toBe(200);
    expect(response.body.plate).toBe(update.plate);
  });

  it('should return 400 if request body is empty', async () => {
    const response = await request(app).put('/taxis/1').send({});
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('El cuerpo de la solicitud está vacío.');
  });

  it('should return 404 if taxi id is not found', async () => {
    const response = await request(app).put('/taxis/000').send({ plate: "ABCD-0000" });
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('No se ha encontrado un taxi con este ID')
  });
});
describe('DELETE/taxis/id', () => {
  it('should return 200  when deleting an existing taxi', async () => {
    const response = await request(app).delete('/taxis/2');
    expect(response.status).toBe(200);
  });

  it('shoud return 404 if taxi id is not found', async () => {
    const response = await request(app).delete('/taxis/000').send({ plate: "ABCD-0000" });
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('No se ha encontrado un taxi con este ID')
  });

});

