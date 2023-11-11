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

        // Change visibility preview
        const previewGoBagBtnNode = document.getElementById("previewGoBagBtn");
        const previewBagPriceNode = document.getElementById("previewBagPrice");
        this.view.changeVisibilityPages(
            previewGoBagBtnNode,
            previewBagPriceNode
        );
        // this.view.renderPreviewPrice(this.model.getOrderCost());
        this.view.renderPricePreview(this.model.getOrderCost());
        this.view.renderBag(this.model.getBag());

        // Кнопка возврата к списку товаров
        const goBackBtn = document.getElementById("goBackFromBagBtn");
        goBackBtn.addEventListener("click", () => {
            this.view.changeVisibilityPages(bagNode, itemsListNode);
            this.view.changeVisibilityPages(
                previewBagPriceNode,
                previewGoBagBtnNode
            );
        });

        // Обработка добавление или уменьшения товаров
        const bagListNode = document.getElementById("bagItemsList");
        bagListNode.addEventListener("click", this._handlerChangeAmountItem);

        // Go to take order
        const goToTakeOrderBtn = document.getElementById(
            "previewGoTakeOrderBtn"
        );
        goToTakeOrderBtn.addEventListener("click", this._handerOpenTakeOrder);
    };

    _handerOpenTakeOrder = () => {
        // Open new page
        const bagNode = document.getElementById("bag");
        const takeOrderNode = document.getElementById("takeOrder");
        this.view.changeVisibilityPages(bagNode, takeOrderNode);

        // Change preview
        const previewBagNode = document.getElementById("previewBag");
        const previewTakeOrder = document.getElementById("previewTakeOrder");
        const previewBagPriceNode = document.getElementById("previewBagPrice");
        this.view.changeVisibilityPages(previewBagNode, previewTakeOrder);
        previewBagPriceNode.classList.remove("visible");

        // render Preview
        const orderCost = this.model.getOrderCost();
        const deliveryCost = this.model.getDeliveryCost();
        const finalCost = this.model.getFinalCost();
        this.view.renderPreviewTakeOrder(orderCost, deliveryCost, finalCost);

        // Render itemList
        this.view.renderTakeOrderItemsList(this.model.getBag());

        // Go back btn handler
        const goBackBtnNode = document.getElementById("goBackFromTakeOrder");
        goBackBtnNode.addEventListener("click", () => {
            this.view.changeVisibilityPages(takeOrderNode, bagNode);
            this.view.changeVisibilityPages(previewTakeOrder, previewBagNode);
            previewBagPriceNode.classList.add("visible");
        });

        // Handler Change Address
        const changeAddressBtnNode =
            document.getElementById("changeAddressBtn");
        changeAddressBtnNode.addEventListener(
            "click",
            this._handlerChangeAddress
        );

        // Handler Change paytype

        // Handler take order
    };

    // handlers
    _handlerChangeAddress = () => {
        const addressPopupNode = document.getElementById("addressPopup");
        this.view.changeVisibilityPopup(addressPopupNode);

        const saveNewAddressBtnNode =
            document.getElementById("saveNewAddressBtn");
        saveNewAddressBtnNode.addEventListener("click", () => {
            this._handlerSaveAddress()
        });
    };

    _handlerSaveAddress = () => {
        const name = document.getElementById("newAddressName").value;
        const street = document.getElementById("newAddressStreet").value;
        const city = document.getElementById("newAddressCity").value;
        const phone = document.getElementById("newAddressPhone").value;

        if (!name && !street && !city && !phone) {
            alert('Заполните все поля')
            return
        }

        this.model.setAddress({name, street, city, phone})
    }

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

            if (this.model.getBag().length == 0) {
                document.getElementById("bag").classList.remove("visible");
                document
                    .getElementById("previewItemsWrapper")
                    .classList.add("visible");
                this._showEror("emptyBag");
                const previewGoBagBtnNode =
                    document.getElementById("previewGoBagBtn");
                const previewBagPriceNode =
                    document.getElementById("previewBagPrice");
                this.view.changeVisibilityPages(
                    previewBagPriceNode,
                    previewGoBagBtnNode
                );
            }
        } else {
            this._handleAddItemToBag(clickedItemId);
        }
        this.view.renderBag(this.model.getBag());
        this.view.renderPricePreview(this.model.getOrderCost());
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
