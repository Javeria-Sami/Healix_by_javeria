import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../app.js';

test('Healix Server Security & Production Hardening Suite', async (t) => {
  await t.test('1. Security Headers & Information Disclosure Protection', async () => {
    const response = await request(app).get('/api/health').expect(200);

    // Verify X-Powered-By is absent
    assert.equal(response.headers['x-powered-by'], undefined);

    // Verify MIME sniffing protection
    assert.equal(response.headers['x-content-type-options'], 'nosniff');

    // Verify Referrer-Policy
    assert.equal(response.headers['referrer-policy'], 'strict-origin-when-cross-origin');

    // Verify Permissions-Policy
    assert.ok(response.headers['permissions-policy']);
    assert.ok(response.headers['permissions-policy'].includes('camera=()'));
    assert.ok(response.headers['permissions-policy'].includes('microphone=()'));

    // Verify Content-Security-Policy
    assert.ok(response.headers['content-security-policy']);
    assert.ok(response.headers['content-security-policy'].includes("frame-ancestors 'none'"));
  });

  await t.test('2. Rate Limiting Headers', async () => {
    const response = await request(app).get('/api/health').expect(200);
    assert.ok(response.headers['ratelimit-limit']);
    assert.ok(response.headers['ratelimit-remaining']);
  });

  await t.test('3. CORS Policy Verification', async () => {
    // Trusted origin request
    const trustedRes = await request(app)
      .get('/api/health')
      .set('Origin', 'http://localhost:5173')
      .expect(200);

    assert.equal(trustedRes.headers['access-control-allow-origin'], 'http://localhost:5173');

    // Unauthorized origin request
    const unauthorizedRes = await request(app)
      .get('/api/health')
      .set('Origin', 'https://malicious-phishing-site.com');

    // CORS middleware either denies header or errors
    assert.notEqual(
      unauthorizedRes.headers['access-control-allow-origin'],
      'https://malicious-phishing-site.com'
    );
  });

  await t.test('4. POST /api/contact - Valid Submission Handling', async () => {
    const validPayload = {
      name: 'Eleanor Vance',
      email: 'eleanor.vance@example.com',
      phone: '+1 (617) 555-0199',
      service: 'cardiovascular',
      message: 'I would like to schedule an executive cardiovascular assessment consultation.',
      honeypot: '',
    };

    const response = await request(app)
      .post('/api/contact')
      .send(validPayload)
      .expect(200);

    assert.equal(response.body.success, true);
    assert.ok(response.body.data.referenceId.startsWith('HLX-'));
    assert.ok(response.body.data.message);
    assert.ok(response.body.data.submittedAt);
  });

  await t.test('5. POST /api/contact - Rejects Invalid Form Inputs with 400', async () => {
    const invalidPayload = {
      name: 'E', // too short (<2 chars)
      email: 'invalid-email-address', // invalid format
      phone: '123', // too short
      service: 'unauthorized-service-category', // not in allowlist
      message: 'short', // too short (<10 chars)
    };

    const response = await request(app)
      .post('/api/contact')
      .send(invalidPayload)
      .expect(400);

    assert.equal(response.body.success, false);
    assert.equal(response.body.error.statusCode, 400);
    assert.ok(Array.isArray(response.body.error.details));
    assert.ok(response.body.error.details.length >= 4);
  });

  await t.test('6. POST /api/contact - Anti-Spam Honeypot Detection', async () => {
    const spamPayload = {
      name: 'Spam Bot',
      email: 'spambot@example.com',
      service: 'general-inquiry',
      message: 'This is a spam message attempting automated solicitation.',
      honeypot: 'http://spam-site-url.com', // Honeypot filled by bot
    };

    const response = await request(app)
      .post('/api/contact')
      .send(spamPayload)
      .expect(400);

    assert.equal(response.body.success, false);
    const honeypotErr = response.body.error.details.find((d) => d.field === 'honeypot');
    assert.ok(honeypotErr);
    assert.ok(honeypotErr.message.includes('Spam submission detected'));
  });

  await t.test('7. POST /api/newsletter - Email Validation', async () => {
    // Valid newsletter subscription
    const validRes = await request(app)
      .post('/api/newsletter')
      .send({ email: 'research.subscriber@example.com' })
      .expect(200);

    assert.equal(validRes.body.success, true);

    // Invalid newsletter subscription
    const invalidRes = await request(app)
      .post('/api/newsletter')
      .send({ email: 'not-an-email' })
      .expect(400);

    assert.equal(invalidRes.body.success, false);
  });

  await t.test('8. Request Body Size Limit Safeguard (100kb)', async () => {
    const oversizedMessage = 'A'.repeat(150 * 1024); // 150kb > 100kb limit
    await request(app)
      .post('/api/contact')
      .send({ message: oversizedMessage })
      .expect(413); // Payload Too Large
  });
});
