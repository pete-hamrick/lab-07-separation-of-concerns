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

describe('03_separation-of-concerns-demo routes', () => {
    beforeEach(() => {
        return setup(pool);
    });

    it('creates a new order in our database and sends a text message', () => {
        return request(app)
            .post('/api/v1/orders')
            .send({ quantity: 10 })
            .then((res) => {
                // expect(createMessage).toHaveBeenCalledTimes(1);
                expect(res.body).toEqual({
                    id: '1',
                    quantity: 10,
                });
            });
    });
    it('gets all orders', () => {
        //navigate to localhost
        //hits app.js > app.use
        //hits controllers/orders.js
        //create get here?
        //call orderService static returnOrders sending a message saying here are all orders
        //or use Order class, static return orders
    });
});
