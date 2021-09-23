const { Router } = require('express');
const OrderService = require('../services/OrderService');

module.exports = Router()
    .post('/', async (req, res, next) => {
        try {
            const order = await OrderService.createOrder(req.body);
            res.send(order);
        } catch (error) {
            next(error);
        }
    })
    .get('/', async (req, res, next) => {
        try {
            const orders = await OrderService.showAllOrders();
            res.send(orders);
        } catch (error) {
            next(error);
        }
    });
// .get('/:id', (req, res, next) => {});
