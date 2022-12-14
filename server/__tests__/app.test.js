const request = require('supertest');
const app = require('../app');

const name = `${Date.now()}movie`;

test('Deve responder na raiz', () => {
	return request(app).get('/').then((res) => {
		expect(res.status).toBe(200);
	});
});

test('Deve listar os filmes', () => {
	return request(app).get('/api/get').then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
	});
});
