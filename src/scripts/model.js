import normalizedItems from "./utils/normalizedItems.js";

export default class Model {
    constructor() {
        this.itemsIDs = [];
        this.itemById = {};

        this.bagItemsIds = [];
        this.bag = [];
        this.cost = {
            order: 0,
            delivery: 10,
        };
        this.orderCost = 0;
        this.deliveryCost = 10;

        this.address = {};

        this.paytypes = {
            card: "Оплата картой при получении",
            cash: "Оплата наличными при получении",
        };
        this.selectedPaytype = "card";

        this.newOrderId = 0;
        this.newOrder = {};
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

    getBagIds() {
        return this.bagItemsIds;
    }

    incrementItemToBag(id) {
        this.bag.forEach((item) => {
            if (item.id == id) {
                item.amount = item.amount + 1;
            }
        });
        this._onBagChanges();
    }

    pushItemToBag(item) {
        this.bagItemsIds.push(item.id);
        this.bag.push({ ...item, amount: 1 });
        this._onBagChanges();
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
        this.cost.order = 0;
        this.bag.forEach((item) => {
            this.cost.order += item.price * item.amount;
            this.cost.order =
                Math.round(parseFloat(this.cost.order) * 100) / 100;
        });
    }

    getCost() {
        return this.cost;
    }

    // new order
    addNewOrder() {
        this.newOrder = {
            id: this.newOrderId,
            order: this.bag,
            cost: { order: this.cost.order, delivery: this.cost.delivery },
            paytype: {
                selectedPaytype: this.selectedPaytype,
                paytypeMessage: this.getPayTypeMessage(),
            },
            address: this.getAddress(),
        };
        this.orders.push(this.newOrder);
        this._setNewOrderId()
        // this.newOrderId += 1;
    }

    setOrders(orders) {
        this.orders = [...orders];
        this._setNewOrderId()
    }

    _setNewOrderId() {
        let idsOrders = [];
        this.orders.forEach((order) => {
            idsOrders.push(Number(order.id));
        });

        if (idsOrders.length == null || idsOrders.length == 0) {
            this.newOrderId = 1;
        }
        if (idsOrders.length == 1) {
            this.newOrderId = idsOrders[0] + 1;
        }

        if (idsOrders.length > 1) {
            idsOrders.sort((a, b) => {
                return a - b;
            });
            this.newOrderId = idsOrders[idsOrders.length - 1] + 1;
        }
    }

    getOrders() {
        return this.orders;
    }

    getNewOrder() {
        return this.newOrder;
    }

    getCompletedOrders() {
        return this.orders;
    }

    // Address
    setAddress(address) {
        this.address = { ...address };
    }

    getAddress() {
        return this.address;
    }

    // Paytype
    setPaytype(paytype) {
        this.selectedPaytype = paytype;
    }

    getPayTypeMessage() {
        return this.paytypes[this.selectedPaytype];
    }

    // Errors

    getTextByError(error) {
        return this.errors[error];
    }

    // clear old data
    clearOldDatas() {
        this.bagItemsIds = [];
        this.bag = [];
        this.cost = {
            order: 0,
            delivery: 10,
        };

        this.address = {
            name: "name",
            street: "street",
            city: "City",
            phone: "phone",
        };

        this.selectedPaytype = "card";
        this.newOrder = {};
    }
}
