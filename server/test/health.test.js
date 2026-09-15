import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../app.js';

test('Healix Server Foundation Tests', async (t) => {
  await t.test('GET /api/health returns operational status', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect(200)
      .expect('Content-Type', /json/);

    assert.equal(response.body.status, 'operational');
    assert.equal(response.body.service, 'healix-api');
    assert.ok(typeof response.body.uptime === 'number');
    assert.ok(response.body.timestamp);
  });

  await t.test('GET /api/non-existent returns structured 404 JSON', async () => {
    const response = await request(app)
      .get('/api/non-existent-endpoint')
      .expect(404)
      .expect('Content-Type', /json/);

    assert.equal(response.body.success, false);
    assert.equal(response.body.error.statusCode, 404);
  });
});
