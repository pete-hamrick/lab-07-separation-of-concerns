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
    })
    .get('/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            const getOrder = await OrderService.showOrder(id);
            res.send(getOrder);
        } catch (error) {
            next(error);
        }
    })
    .patch('/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            const quantity = req.body.quantity;
            const updateOrder = await OrderService.updateOrder(id, quantity);
            res.send(updateOrder);
        } catch (error) {
            next(error);
        }
    });
