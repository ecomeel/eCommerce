import View from "./view";
import Model from "./model";
import Api from "./api";

import "../styles/scss/style.scss";

export default class Controller {
    constructor() {
        this.view = new View({
            userClickedItem: this._handleOpenSelectedItem,
        });
        this.model = new Model();
        this.api = new Api();
    }

    init() {
        const items = this.api.getItems();
        this.model.setItems(items);
        this.view.renderItems(items);
    }

    _handleOpenSelectedItem = (e) => {
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
            this._openNextPage(selectedItemNode, item);
            this.view.renderItemCard(item)

            this._ListenerGoPreviousPage("goBackToItemsBtn");


        }
    };

    _handleAddItemToBag(item) {
        this.model.addItemToBag(item);
        this.view.renderPreviewBag(item);

        
    }

    _openNextPage(itemClickNode) {
        const prevPageNode = itemClickNode.parentElement;
        const nextPageNode = prevPageNode.nextElementSibling;
        this.view.changeVisibilityPages(prevPageNode, nextPageNode);
    }

    _handlerOpenPreviousPage(itemClickNode) {
        const prevPageNode = itemClickNode.parentElement;
        const nextPageNode = prevPageNode.previousElementSibling;
        this.view.changeVisibilityPages(prevPageNode, nextPageNode)
    }

    _ListenerGoPreviousPage(goBackBtnID) {
        const backButton = document.getElementById(goBackBtnID);
        backButton.addEventListener('click', () => this._handlerOpenPreviousPage(backButton))
    }
}
