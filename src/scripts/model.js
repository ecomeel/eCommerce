import { v4 as uuidv4 } from 'uuid';


export default class Model {
    constructor() {
        this.items = [];
        this.itemsIDs = [];
        this.bagNumItems = {};
        this.bagItems = []


    }

    //Items

    setItems(products) {
        this.items = products;

        this._setIDsList()
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

    //Bag
    addItemToBag(item) {
        const id = item.id
        if (this.bagNumItems[id]) {i
            this.bagNumItems[id] += 1;
        } else {
            this.bagNumItems[id] = 1
            // this.bagItems.push(item)
        }

    }

    getBagNumItemsId() {
        return this.bagIds;
    }

    getBagItems() {
        const bag = []
        for(item in this.bagIds) {
            bag.push(item)
        }
        return bag;
    }

    _setIDsList() {
        this.items.forEach(item => {
            this.itemsIDs.push(item.id)
        });

    }

}