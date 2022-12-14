const request = require('supertest');
const app = require('../app');

const name = `${Date.now()}movie`;

test('Deve listar os filmes', () => {
	return request(app).get('/api/get').then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
	});
});

test('Deve inserir um review com sucesso', async () => {
	return await request(app).post('/api/insert').send({
		name: name,
		review: 'A great movie'
	}).then((res) => {
		console.log(res);
		expect(res.body.review).toBe('A great movie');
	})
});

test('Deve atualizar um review com sucesso', async () => {
	return await request(app).put('/api/update').send({
		name: 'Teste',
		review: 'A great movie'
	}).then((res) => {
		expect(res.body.review).toBe('An awesome movie');
	})
});
