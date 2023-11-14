import { v4 as uuidv4 } from "uuid";

import normalizedItems from "./utils/normalizedItems.js";

export default class Model {
    constructor() {
        this.itemsIDs = [];
        this.itemById = {};

        this.bagItemsIds = [];
        this.bag = [];
        this.orderCost = 0;
        this.deliveryCost = 10;

        this.address = {}

        this.paytypes = {
            card: 'Оплата картой при получении',
            cash: 'Оплата наличными при получении'
        }
        this.selectedPaytype = 'card';

        this.newOrderId = 1;
        this.orders = [];

        this.errors = {
            noProduct: "Упс, ошибка. Такого товара нет.",
            emptyBag: "Корзина пуста",
            emptyOrder: "В заказе не товаров",
            notFoundOrder: "Страница не найдена",
        };
    }

    //Items

    setItems(products) {
        [this.itemsIDs, this.itemById] = normalizedItems(products);
    }

    getItems() {
        const items = [];
        this.itemsIDs.forEach((id) => {
            items.push(this.getItemById(id));
        });
        return items;
    }

    getItemsIDs() {
        return this.itemsIDs;
    }

    getItemById(id) {
        return this.itemById[id];
    }

    //Bag
    setBag(products) {
        this.bag = products;
        this.bag.forEach((item) => {
            this.bagItemsIds.push(item.id);
        });

        this._onBagChanges();
    }

    getBag() {
        return this.bag;
    }

    addItemToBag(id) {
        const item = this.getItemById(id);

        if (this.bagItemsIds.includes(id)) {
            this.incrementItemToBag(id);
        } else {
            this.bagItemsIds.push(id);
            this.bag.push({ ...item, amount: 1 });
        }

        this._onBagChanges();
    }

    incrementItemToBag(id) {
        this.bag.forEach((item) => {
            if (item.id == id) {
                item.amount = item.amount + 1;
            }
        });
    }

    decrementItemToBag(id) {
        let isItemDeleted = false;
        this.bag.forEach((item) => {
            if (item.id == id) {
                item.amount -= 1;

                if (item.amount < 1) {
                    isItemDeleted = true;
                }
            }
        });

        if (isItemDeleted) {
            isItemDeleted = false;
            const index = this.bagItemsIds.indexOf(id);

            this.bag = this.bag.filter((item) => item.id != id);
            this.bagItemsIds.splice(index);
        }
        this._onBagChanges();
    }

    // Price
    _onBagChanges() {
        this.orderCost = 0;
        this.bag.forEach((item) => {
            this.orderCost += item.price * item.amount;

        });
        console.log("bag: ", this.bag);
        console.log(("order cost: ", this.orderCost));
    }

    getOrderCost() {
        return this.orderCost;
    }

    getDeliveryCost() {
        return this.deliveryCost;
    }

    getFinalCost() {
        return this.deliveryCost + this.orderCost;
    }

    // new order
    takeOrder() {
        const newOrder = {
            id: this.newOrderId,
            order: this.bag,
            cost: this.getFinalCost(),
            paytype: this.selectedPaytype,
            address: this.address
        }
        this.orders.push(this.newOrder);
        this.newOrderId += 1;
    }

    setOrders(orders) {
        this.orders = orders
    }

    getCompletedOrders() {
        return this.orders
    }

    // Address
    setAddress(address) {
        this.address = {...address}
    }

    getAddress() {
        return this.address
    }

    // Paytype
    setPaytype(paytype) {
        this.selectedPaytype = paytype
    }

    getPayTypeMessage() {
        return this.paytypes[this.selectedPaytype];
    }

    // Errors

    getTextByError(error) {
        return this.errors[error];
    }
}
