import View from "./view";
import Model from "./model";
import Api from "./api";

import "../styles/scss/style.scss";

export default class Controller {
    constructor() {
        this.view = new View({
            userClickedItem: this._handleUserSelectItem,
        });
        this.model = new Model();
        this.api = new Api();
    }

    init() {
        setTimeout(() => {
            const items = this.api.getItems();
            this.model.setItemsList(items);
            this.model.setIDsList();
            this.view.renderItems(this.model.getItems());
        }, 1000);
    }

    _handleAddItemToBag(item) {
        this.model.addItemToBag(item);
        this.view.renderPreviewBag(item);
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
            // Клик по корзине
            this._handleAddItemToBag(item);
        } else {
            // Клик по продукту
            this._showItemCard(selectedItemNode, item);

            const goBackBtn = document.getElementById("goBackToItemsBtn");
            goBackBtn.addEventListener("click", () => {
                const hidePageNode = goBackBtn.parentElement;
                const showPageNode = hidePageNode.previousElementSibling;
                hidePageNode.classList.remove('activated');
                showPageNode.classList.remove('deactivated')
            });
        }
    };

    _handleChangeBag(ids, items) {
        console.log(ids, items);
    }
}
