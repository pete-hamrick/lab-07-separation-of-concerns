const Order = require('../models/Order');
const { sendSms } = require('../utils/twilio');

module.exports = class OrderService {
    //send a text and store the order
    static async createOrder({ quantity }) {
        //send text
        await sendSms(
            process.env.ORDER_HANDLER_NUMBER,
            `New Order received for ${quantity}`
        );

        //store the order
        const order = await Order.insert({ quantity });

        return order;
    }

    static async showAllOrders() {
        await sendSms(process.env.ORDER_HANDLER_NUMBER, 'Getting your orders');

        const returnOrders = await Order.returnOrders();

        return returnOrders;
    }

    static async showOrder(id) {
        await sendSms(
            process.env.ORDER_HANDLER_NUMBER,
            `Getting your order: ${id}`
        );

        const returnOrder = await Order.returnOrder(id);

        return returnOrder;
    }
    static async updateOrder(id, quantity) {
        await sendSms(
            process.env.ORDER_HANDLER_NUMBER,
            `Updating order: ${id} to quantity: ${quantity}`
        );

        const returnOrder = await Order.updateUserOrder(id, quantity);

        return returnOrder;
    }
};
