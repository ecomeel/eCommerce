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
            this._handleAddItemToBag(item);
        } else {
            // Change visible pages
            const prevPageNode = selectedItemNode.parentElement.parentElement;
            const nextPageNode = prevPageNode.nextElementSibling;
            prevPageNode.classList.remove("visible");
            nextPageNode.classList.add("visible");

            this.view.renderItemCard(item);

            // Вернуться на прошлую страницу
            const backButton = document.getElementById("goBackToItemsBtn");
            backButton.addEventListener("click", () => {
                const prevPageNode = backButton.parentElement;
                const nextPageNode = prevPageNode.previousElementSibling;
                prevPageNode.classList.remove("visible");
                nextPageNode.classList.add("visible");
            });

            // Добавить товар в корзину
            const addBtnNode = document.getElementById("addToBagFromItemcard");
            const idItem = addBtnNode.getAttribute("data-item-id");
            addBtnNode.addEventListener("click", () => {
                this._handleAddItemToBag(this.model.getItemById(idItem));
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
        itemsListNode.classList.remove("visible");
        itemCardNode.classList.remove("visible");
        bagNode.classList.add("visible");

        // Отрисовываем корзину
        this.view.renderBag(this.model.getBag());

        // Обработка добавление или уменьшения товаров
        // Здесь ошибка // Возможно навешиваются 2 обработчика на 1 кнопку
        const bagListNode = document.getElementById("bagItemsList");
        bagListNode.addEventListener("click", this._handlerChangeAmountItem);

        // Кнопка возврата к списку товаров
        const goBackBtn = document.getElementById("goBackFromBagBtn");
        goBackBtn.addEventListener("click", () => {
            itemsListNode.classList.add("visible");
            bagNode.classList.remove("visible");
        });
    };

    // handlers

    _handlerChangeAmountItem = (e) => {
        const onElementClicked = e.target;
        const clickedItem = e.target.closest("li");
        const clickedBtn = e.target.closest("button");
        const clickedItemId = clickedItem.getAttribute("data-item-id");

        if (!onElementClicked) return;

        if (!clickedItem) return;

        if (!clickedBtn) return;

        if (clickedBtn.classList.contains("bag__change-amount_minus")) {
            this.model.decrementItemToBag(clickedItemId);
            this.view.renderBag(this.model.getBag());
            this.view.renderPreviewBag(this.model.getBag());
        }

        if (clickedBtn.classList.contains("bag__change-amount_plus")) {
            this.model.incrementItemToBag(clickedItemId);
            this.view.renderBag(this.model.getBag());
            this.view.renderPreviewBag(this.model.getBag());
        }
    };

    _handleAddItemToBag(item) {
        this.model.addItemToBag(item);
        this.view.renderPreviewBag(this.model.getBag());
    }

    _handlerOpenPreviousPage(itemClickNode) {
        const prevPageNode = itemClickNode.parentElement;
        const nextPageNode = prevPageNode.previousElementSibling;
        this.view.changeVisibilityPages(prevPageNode, nextPageNode);
    }

    _showEror(error) {
        const errorTitle = this.model.getTextByError(error);
        this.view.renderError(errorTitle);
    }
}
