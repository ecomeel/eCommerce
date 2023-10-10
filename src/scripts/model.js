import { v4 as uuidv4 } from 'uuid';


export default class Model {
    constructor() {
        this.items = [];
        this.itemsIDs = [];
        this.bagIds = {}
    }

    //Items
    setIDsList() {
        this.items.forEach(item => {
            this.itemsIDs.push(item.id)
        });

    }

    setItemsList(arr) {
        this.items = arr;
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
    addItemToBag(id) {
        if (this.bagIds[id]) {
            this.bagIds[id] += 1;
        } else {
            this.bagIds[id] = 1
        }
    }

    getBagIds(){
        return this.bagIds;
    }




}