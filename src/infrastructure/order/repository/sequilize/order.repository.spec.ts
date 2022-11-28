import { Sequelize } from "sequelize-typescript";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import Product from "../../../../domain/product/entity/product";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import ProductModel from "../../../product/repository/sequelize/product.model";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import OrderRepository from "./order.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const ordemItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [ordemItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: ordemItem.id,
          name: ordemItem.name,
          price: ordemItem.price,
          quantity: ordemItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });

  it("should update an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer("111", "Customer 1");
    const customer2 = new Customer("222", "Customer 2");
    const address1 = new Address("Street 1", 1, "Zipcode 1", "City 1");
    const address2 = new Address("Street 2", 2, "Zipcode 2", "City 2");
    customer1.changeAddress(address1);
    customer2.changeAddress(address2);
    customer2.activate();
    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const productRepository = new ProductRepository();
    const product1 = new Product("123", "Product 1", 10);
    const product2 = new Product("1234", "Product 2", 20);
    await productRepository.create(product1);
    await productRepository.create(product2);

    const ordemItem1 = new OrderItem(
      "1",
      product1.name,
      product1.price,
      product1.id,
      2
    );

    const ordemItem2 = new OrderItem(
      "2",
      product2.name,
      product2.price,
      product2.id,
      4
    );

    const order = new Order("111", "111", [ordemItem1, ordemItem2]);

    const orderRepository = new OrderRepository();
    
    await orderRepository.create(order);

    order.changeCustomer(customer2.id);    
    
    orderRepository.update(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items","customer"],
    });
    
    expect(orderModel.customer.city).toEqual("City 2");    
    
    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: "222",
      total: order.total(),
      items: [
        {
          id: ordemItem1.id,
          name: ordemItem1.name,
          price: ordemItem1.price,
          quantity: ordemItem1.quantity,
          order_id: order.id,
          product_id: "123",
        },
        {
          id: ordemItem2.id,
          name: ordemItem2.name,
          price: ordemItem2.price,
          quantity: ordemItem2.quantity,
          order_id: order.id,
          product_id: "1234",
        },
      ],
      customer: {
        id: customer2.id,
        name: customer2.name,
        street: customer2.Address.street,
        number: customer2.Address.number,
        zipcode: customer2.Address.zip,
        city: customer2.Address.city,
        active: true,
        rewardPoints: 0
      }
    });
  });

  it("should find a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer("111", "Customer 1");
    const customer2 = new Customer("222", "Customer 2");
    const address1 = new Address("Street 1", 1, "Zipcode 1", "City 1");
    const address2 = new Address("Street 2", 2, "Zipcode 2", "City 2");
    customer1.changeAddress(address1);
    customer2.changeAddress(address2);
    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const productRepository = new ProductRepository();
    const product1 = new Product("123", "Product 1", 10);
    const product2 = new Product("1234", "Product 2", 20);
    await productRepository.create(product1);
    await productRepository.create(product2);

    const ordemItem1 = new OrderItem(
      "1",
      product1.name,
      product1.price,
      product1.id,
      2
    );
    const ordemItem2 = new OrderItem(
      "2",
      product2.name,
      product2.price,
      product2.id,
      4
    );

    const order = new Order("111", "111", [ordemItem1, ordemItem2]);

    const orderRepository = new OrderRepository();
    
    await orderRepository.create(order);

    const orderResult = await orderRepository.find("111");

    expect(order).toStrictEqual(orderResult);
  });

  it("should find all order", async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer("111", "Customer 1");
    const customer2 = new Customer("222", "Customer 2");
    const address1 = new Address("Street 1", 1, "Zipcode 1", "City 1");
    const address2 = new Address("Street 2", 2, "Zipcode 2", "City 2");
    customer1.changeAddress(address1);
    customer2.changeAddress(address2);
    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const productRepository = new ProductRepository();
    const product1 = new Product("123", "Product 1", 10);
    const product2 = new Product("1234", "Product 2", 20);
    await productRepository.create(product1);
    await productRepository.create(product2);

    const ordemItem1 = new OrderItem(
      "1",
      product1.name,
      product1.price,
      product1.id,
      2
    );
    const ordemItem2 = new OrderItem(
      "2",
      product2.name,
      product2.price,
      product2.id,
      4
    );

    const order1 = new Order("111", "111", [ordemItem1]);
    const order2 = new Order("222", "222", [ordemItem2]);

    const orderRepository = new OrderRepository();
    
    await orderRepository.create(order1);
    await orderRepository.create(order2);

    const orders = await orderRepository.findAll();        
    
    expect(orders).toHaveLength(2);
    expect(orders).toContainEqual(order1);
    expect(orders).toContainEqual(order2);
  });
});
