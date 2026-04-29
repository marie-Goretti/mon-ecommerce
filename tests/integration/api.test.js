const request = require('supertest');
const app = require('../../backend/src/index');

describe('Health Check', () => {
  it('GET /api/health → 200', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('OK');
  });
});

describe('Auth endpoints', () => {
  it('POST /api/auth/register → 400 si champs manquants', async () => {
    const res = await request(app).post('/api/auth/register').send({});
    expect(res.status).toBe(400);
  });

  it('POST /api/auth/login → 401 si mauvais credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'fake@test.com', password: 'wrong' });
    expect(res.status).toBe(401);
  });
});

describe('Products endpoints', () => {
  it('GET /api/products → 200 avec liste', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('products');
  });
});