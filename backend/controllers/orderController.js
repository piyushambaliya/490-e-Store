import Order from '../models/Order.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
  const {
    user,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  try {
    if (orderItems && orderItems.length === 0) {
      res.status(400).json({ message: 'No order items' });
      return;
    } else {
      const order = new Order({
        user,
        orderItems: orderItems.map((x) => ({
          ...x,
          product: x.id || x._id, // Handle both id and _id from frontend
          _id: undefined,
        })),
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        isPaid: true, // Auto-paid for dummy flow
        paidAt: Date.now(),
        paymentResult: {
          id: 'pay_' + Math.random().toString(36).substring(7),
          status: 'COMPLETED',
          update_time: new Date().toISOString(),
          email_address: 'customer@example.com',
        },
      });

      const createdOrder = await order.save();

      res.status(201).json(createdOrder);
    }
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ message: 'Server error while creating order' });
  }
};

export { addOrderItems };
