const pool = require('../lib/utils/pool');
// const twilio = require('twilio');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('twilio', () => () => ({
    messages: {
        create: jest.fn(),
    },
}));

describe('separation of concerns lab', () => {
    beforeEach(() => {
        return setup(pool);
    });
    beforeEach(() => {
        return request(app).post('/api/v1/orders').send({ quantity: 10 });
    });
    beforeEach(() => {
        return request(app).post('/api/v1/orders').send({ quantity: 6 });
    });
    afterEach(() => {
        return app.close;
    });

    it('creates a new order in our database and sends a text message', () => {
        return request(app)
            .post('/api/v1/orders')
            .send({ quantity: 10 })
            .then((res) => {
                // expect(createMessage).toHaveBeenCalledTimes(1);
                expect(res.body).toEqual({
                    id: '3',
                    quantity: 10,
                });
            });
    });
    it('gets all orders', () => {
        return request(app)
            .get('/api/v1/orders')
            .then((res) => {
                expect(res.body).toEqual([
                    {
                        id: '1',
                        quantity: 10,
                    },
                    {
                        id: '2',
                        quantity: 6,
                    },
                ]);
            });
    });
    it('gets an order by id', () => {
        return request(app)
            .get('/api/v1/orders/2')
            .then((res) => {
                expect(res.body).toEqual({
                    id: '2',
                    quantity: 6,
                });
            });
    });

    it('should PATCH an order by id and returns the updated order', () => {
        return request(app)
            .patch('/api/v1/orders/2')
            .send({ quantity: 9 })
            .then((res) => {
                expect(res.body).toEqual({
                    id: '2',
                    quantity: 9,
                });
            });
    });

    it('should DELETE an order by id', () => {
        return request(app)
            .delete('/api/v1/orders/2')
            .then((res) => {
                expect(res.body).toEqual({
                    id: '2',
                    quantity: 6,
                });
            });
    });
});
