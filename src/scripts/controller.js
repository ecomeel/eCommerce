import View from "./view";
import Model from "./model";

export default class Controller {
    constructor() {
        this.view = new View();
        this.model = new Model();

    }

    init() {
        this.model.setIDsList()
        console.log(this.model.getItemsIDs())

        this.model.setItemsList()
        console.log(this.model.getItems())
    }

}