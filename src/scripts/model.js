import { v4 as uuidv4 } from "uuid";

import normalizedItems from "./utils/normalizedItems.js";
import normalizedBag from "./utils/normalizedBag.js";

export default class Model {
    constructor() {
        this.itemsIDs = [];
        this.itemById = {};

        this.bagItemsIds = [];
        this.bagNumItemsById = {};

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
    setBagItems(products) {
        [this.bagItemsIds, this.bagNumItemsById] = normalizedBag(products);
    }

    addItemToBag(item) {
        const id = item.id;

        if (!this.bagItemsIds.includes(id)) {
            this.bagItemsIds.push(id);
            this.bagNumItemsById[id] = 1;
        } else {
            this.bagNumItemsById[id] = this.bagNumItemsById[id] + 1;
        }
        console.log(this.bagNumItemsById);
    }

    getBagItems() {
        const bag = [];
        this.bagItemsIds.forEach((id) => {
            const item = this.getItemById(id);
            item.amount = this.bagNumItemsById[id];
            bag.push(item);
        });
        return bag;
    }

    // Errors

    getTextByError(error) {
        return this.errors[error];
    }
}
