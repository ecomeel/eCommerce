import { v4 as uuidv4 } from "uuid";

import normalizedItems from "./utils/normalizedItems.js";
import normalizedBag from "./utils/normalizedBag.js";

export default class Model {
    constructor() {
        this.itemsIDs = [];
        this.itemById = {};

        this.bagItemsIds = [];
        this.bag = [];

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
        this.bag.forEach(item => {
            this.bagItemsIds.push(item.id)
        })
    }

    addItemToBag(item) {
        const id = item.id

        //refactoring
        if (!this.bagItemsIds.includes(id)) {
            this.bagItemsIds.push(id);
            this.bag.push({...item, amount: 1})
        } else {
            this.bag.forEach(product => {
                if (product.id == id) {
                    product.amount = product.amount + 1
                }
            })
        }
    }

    getBag() {
        return this.bag
    }

    // Errors

    getTextByError(error) {
        return this.errors[error];
    }
}
