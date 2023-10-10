import View from "./view";
import Model from "./model";

import { v4 as uuidv4 } from "uuid";

const itemsFrSt = [
    {
        id: uuidv4(),
        name: "Apple watch",
        model: "Series 5 SE",
        price: 529,
        imgSrc: "../../img/products/apple-watch.png",
        shortDesc:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, ratione?",
        mainDesc:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi temporibus magnam dolorem nobis repellendus alias ab aspernatur error illum dolores.",
        fullDesc:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat eius repellendus, omnis dolorum dolor et est natus quae tempora quidem labore sequi possimus quia ex odit cupiditate, excepturi provident reiciendis exercitationem eos. Quidem sunt quibusdam eius, qui autem soluta magni deserunt corrupti fugit velit architecto nam et magnam ut, officia nemo labore voluptatibus est consequatur quaerat tempore placeat, provident veritatis! Debitis aspernatur voluptatibus sapiente sed nisi dolorum eius enim at officia similique ipsa, laboriosam pariatur aliquam eum dolore corporis quas temporibus, deserunt fugit non atque, necessitatibus illo. Cum laborum sed ullam, ab consequatur natus nemo perspiciatis odit porro quisquam consectetur!",
        rating: 4,
    },
    {
        id: uuidv4(),
        name: "Apple watch",
        model: "Series 5 SE",
        price: 529,
        imgSrc: "../../img/products/apple-watch.png",
        shortDesc:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, ratione?",
        mainDesc:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi temporibus magnam dolorem nobis repellendus alias ab aspernatur error illum dolores.",
        fullDesc:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat eius repellendus, omnis dolorum dolor et est natus quae tempora quidem labore sequi possimus quia ex odit cupiditate, excepturi provident reiciendis exercitationem eos. Quidem sunt quibusdam eius, qui autem soluta magni deserunt corrupti fugit velit architecto nam et magnam ut, officia nemo labore voluptatibus est consequatur quaerat tempore placeat, provident veritatis! Debitis aspernatur voluptatibus sapiente sed nisi dolorum eius enim at officia similique ipsa, laboriosam pariatur aliquam eum dolore corporis quas temporibus, deserunt fugit non atque, necessitatibus illo. Cum laborum sed ullam, ab consequatur natus nemo perspiciatis odit porro quisquam consectetur!",
        rating: 4,
    },
    {
        id: uuidv4(),
        name: "Apple watch",
        model: "Series 5 SE",
        price: 529,
        imgSrc: "../../img/products/apple-watch.png",
        shortDesc:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, ratione?",
        mainDesc:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi temporibus magnam dolorem nobis repellendus alias ab aspernatur error illum dolores.",
        fullDesc:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat eius repellendus, omnis dolorum dolor et est natus quae tempora quidem labore sequi possimus quia ex odit cupiditate, excepturi provident reiciendis exercitationem eos. Quidem sunt quibusdam eius, qui autem soluta magni deserunt corrupti fugit velit architecto nam et magnam ut, officia nemo labore voluptatibus est consequatur quaerat tempore placeat, provident veritatis! Debitis aspernatur voluptatibus sapiente sed nisi dolorum eius enim at officia similique ipsa, laboriosam pariatur aliquam eum dolore corporis quas temporibus, deserunt fugit non atque, necessitatibus illo. Cum laborum sed ullam, ab consequatur natus nemo perspiciatis odit porro quisquam consectetur!",
        rating: 4,
    },
];

export default class Controller {
    constructor() {
        this.view = new View({
            userClickedItem: this._handleUserSelectItem,
        });
        this.model = new Model();
    }

    init() {
        setTimeout(() => {
            const arr = itemsFrSt;
            this.model.setItemsList(arr); // set items list
            this.model.setIDsList(); // set IDs
            this.view.renderItems(this.model.getItems()); // render itemsF
        }, 1000);
    }

    _handleAddItemToBag(item) {
        this.model.addItemToBag(item.id);
        console.log(this.model.getBagIds())

    }

    _showItemCard(selectedItemNode, item) {
        const hidePageNode = selectedItemNode.parentElement;
        const showPageNode = hidePageNode.nextElementSibling;
        this.view.renderChangePage(hidePageNode, showPageNode);
        this.view.renderItemCard(item);
    }

    _handleUserSelectItem = (e) => {
        const elementClicked = e.target;
        const selectedItemNode = elementClicked.closest("li");

        if (selectedItemNode == null) return;

        const itemId = selectedItemNode.getAttribute("data-item-id");
        const item = this.model.getItemById(itemId);

        if (elementClicked.classList.contains("js-items-add-to-bag")) {
            this._handleAddItemToBag(item);
        } else {
            this._showItemCard(selectedItemNode, item);
        }
    };
}
