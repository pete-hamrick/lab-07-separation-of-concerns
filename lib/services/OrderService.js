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

        const showOrder = await Order.returnOrder(id);

        return showOrder;
    }
    static async updateOrder(id, quantity) {
        await sendSms(
            process.env.ORDER_HANDLER_NUMBER,
            `Updating order: ${id} to quantity: ${quantity}`
        );

        const updatedOrder = await Order.updateUserOrder(id, quantity);

        return updatedOrder;
    }

    static async deleteOrder(id) {
        await sendSms(
            process.env.ORDER_HANDLER_NUMBER,
            `Deleting order: ${id}`
        );

        const deletedOrder = await Order.deleteUserOrder(id);

        return deletedOrder;
    }
};
