// import { OrderItem } from "sequelize/types";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface{
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }
  async update(entity: Order): Promise<void> {

      let items = entity.items.map((item) => ({   
        id: item.id,         
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
      }));
      await OrderModel.update(
        {
          customer_id: entity.customerId,
          total: entity.total(),          
          items,          
        },
        {
          where: {
            id: entity.id,
          },
        },
      )
  }
  async find(id: string): Promise<Order> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: {
          id,
        },
        include: ["items"],
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Order not found");
    }

    let items: OrderItem[] = [];    
    
    orderModel.items.map((item) => {
      console.log(item.id, item.name, item.price, item.product_id, item.quantity);
      
      let it = new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity);
      items.push(it)
    })

    const order = new Order(id, orderModel.customer_id, items);
    
    return order;
  }
  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: ["items"],
    });

    const orders = orderModels.map((item) => {            
      
      let items: OrderItem[] = [];
      item.items.map((item) => {
        let it = new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity);
        items.push(it)
      })
      let order = new Order(item.id, item.customer_id, items);
      
      return order;
    });

    return orders;
  }
}
