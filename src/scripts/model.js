import { v4 as uuidv4 } from 'uuid';


export default class Model {
    constructor() {
        this.items = []
        this.itemsIDs = []

        
    }


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
}