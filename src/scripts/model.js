import { v4 as uuidv4 } from 'uuid';


export default class Model {
    constructor() {
        this.items = [];
        this.itemsIDs = [];
        this.bag = [];


    }


    setIDsList() {
        this.items.forEach(item => {
            this.itemsIDs.push(item.id)
        });

    }

    setItemsList(arr) {
        this.items = arr;
    }

    addItemToBag(item) {
        this.bag.push(item)
    }


    getItems() {
        return this.items
    }

    getItemsIDs() {
        return this.itemsIDs
    }

    getItemById(itemID) {
        let itemn
        this.items.forEach(item => {
            if (item.id === itemID) {
                itemn = item;
            }
        });
        return itemn

    }
}