const express = require('express');
const request = require('supertest');
const bookRoute = require('../routes/books.route');
const app = express();

app.use(express.json());

app.use('/api/books', bookRoute);

jest.mock('../data/books.json', () => [
	{ name: 'Call of the wild', author: 'Louis wilder', id: 1 },
	{ name: 'Love like no other', author: 'Charlie Bronsey', id: 2 },
	{ name: 'Dream', author: 'Jamie Phillips', id: 3 }
]);

describe('Integration tests for the books API', () => {
	it('GET /api/books - success -  get all the books ', async () => {
		const { body, statusCode } = await request(app).get('/api/books');

		expect(body).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					id: expect.any(Number),
					name: expect.any(String),
					author: expect.any(String)
				})
			])
		);

		expect(statusCode).toBe(200);
	});

	it('POST  /api/books - faliure on invalid post body', async () => {
		const { body, statusCode } = await request(app).post('/api/books').send({
			name: '',
			author: 'John Travolta'
		});

		expect(statusCode).toBe(400);
		expect(body).toEqual({
			errors: [
				{
					location: 'body',
					msg: 'Book name is required',
					param: 'name',
					value: ''
				}
			]
		});
	});

	it('POST /api/books - success', async () => {
		const { body, statusCode } = await request(app).post('/api/books').send({
			name: 'Face Off',
			author: 'John Travolta'
		});

		expect(statusCode).toBe(200);

		expect(body).toEqual({
			message: 'Success'
		});
	});

	it('PUT /api/books/:bookid - failure when book is not found', async () => {
		const { body, statusCode } = await request(app).put('/api/books/5000').send({
			name: 'Love me like you do',
			author: 'John Travolta'
		});

		expect(statusCode).toBe(404);

		expect(body).toEqual({
			error: true,
			message: 'Book not found'
		});
	});

	it('PUT /api/books/:bookid - Success - Successfully updated book', async () => {
		const { body, statusCode } = await request(app).put('/api/books/2').send({
			name: 'Hello world',
			author: 'Jack White'
		});

		expect(statusCode).toBe(201);

		expect(body).toEqual({
			name: 'Hello world',
			author: 'Jack White',
			id: 2
		});
	});

	it('DELETE /api/books/:bookid - failure when book is not found', async () => {
		const { body, statusCode } = await request(app).delete('/api/books/5000');
		expect(statusCode).toBe(404);

		expect(body).toEqual({
			error: true,
			message: 'Book not found'
		});
	});

	it('DELETE /api/books/:bookid - failure when book is not found', async () => {
		const { body, statusCode } = await request(app).delete('/api/books/3');
		expect(statusCode).toBe(201);
		expect(body).toEqual({
			message: 'Success'
		});
	});
});
