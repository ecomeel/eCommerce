import View from "./view";
import Model from "./model";
import Api from "./api";

import "../styles/scss/style.scss";

export default class Controller {
    constructor() {
        this.view = new View({
            userClickedItem: this._handleOpenSelectedItem,
            userGoToBag: this._handleOpenBag,
        });
        this.model = new Model();
        this.api = new Api();
    }

    init() {
        this.model.setItems(this.api.getItems());
        this.view.renderItems(this.model.getItems());

        this.model.setBag(this.api.getBagItems());
        this.view.renderPreviewBag(this.model.getBag());
    }

    // Open new pages
    _handleOpenSelectedItem = (e) => {
        const elementClicked = e.target;
        const selectedItemNode = elementClicked.closest("li");

        if (selectedItemNode == null) return;

        const itemId = selectedItemNode.getAttribute("data-item-id");
        const item = this.model.getItemById(itemId);

        if (!item) {
            this._showEror("noProduct");
            return;
        }

        const onAddToBagBtnClick = elementClicked.classList.contains(
            "js-items-add-to-bag"
        );

        if (onAddToBagBtnClick) {
            this._handleAddItemToBag(itemId);
        } else {
            // Change visible pages
            const itemsListNode = document.getElementById(
                "previewItemsWrapper"
            );
            const itemCardNode = document.getElementById("itemCard");
            this.view.changeVisibilityPages(itemsListNode, itemCardNode);

            this.view.renderItemCard(item);

            // Вернуться на прошлую страницу
            const backButton = document.getElementById("goBackToItemsBtn");
            backButton.addEventListener("click", () => {
                this.view.changeVisibilityPages(itemCardNode, itemsListNode);
            });

            // Добавить товар в корзину
            const addBtnNode = document.getElementById("addToBagFromItemcard");
            const idItem = addBtnNode.getAttribute("data-item-id");
            addBtnNode.addEventListener("click", () => {
                this._handleAddItemToBag(idItem);
            });
        }
    };

    _handleOpenBag = () => {
        if (this.model.getBag().length == 0) {
            this._showEror("emptyBag");
            return;
        }

        // Отображаем корзину и убираем прошлый экран
        const itemsListNode = document.getElementById("previewItemsWrapper");
        const itemCardNode = document.getElementById("itemCard");
        const bagNode = document.getElementById("bag");
        itemCardNode.classList.remove("visible");
        this.view.changeVisibilityPages(itemsListNode, bagNode);
        this.view.renderBag(this.model.getBag());

        // Кнопка возврата к списку товаров
        const goBackBtn = document.getElementById("goBackFromBagBtn");
        goBackBtn.addEventListener("click", () => {
            this.view.changeVisibilityPages(bagNode, itemsListNode);
        });

        // Обработка добавление или уменьшения товаров
        const bagListNode = document.getElementById("bagItemsList");
        bagListNode.addEventListener("click", this._handlerChangeAmountItem);
    };

    // handlers
    _handlerChangeAmountItem = (e) => {
        const onElementClicked = e.target;
        const clickedItem = e.target.closest("li");
        const clickedBtn = e.target.closest("button");
        const clickedItemId = clickedItem.getAttribute("data-item-id");

        if (!onElementClicked) return;

        if (!clickedBtn) return;

        if (clickedBtn.classList.contains("bag__change-amount_minus")) {
            this.model.decrementItemToBag(clickedItemId);
            this.view.renderPreviewBag(this.model.getBag());
        } else {
            this._handleAddItemToBag(clickedItemId);
        }
        this.view.renderBag(this.model.getBag());
    };

    _handleAddItemToBag(id) {
        this.model.addItemToBag(Number(id));
        this.view.renderPreviewBag(this.model.getBag());
    }

    _showEror(error) {
        const errorTitle = this.model.getTextByError(error);
        this.view.renderError(errorTitle);
    }
}
