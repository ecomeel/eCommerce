import View from "./view";
import Model from "./model";
import Api from "./api";

import "../styles/scss/style.scss";
import { render } from "sass";

export default class Controller {
    constructor() {
        this.view = new View({
            userClickedItem: this._handleOpenSelectedItem,
            userGoToBag: this._handleOpenBag,
            userSelectedOrder: this._handleOpenSelectedOrder,
        });
        this.model = new Model();
        this.api = new Api();
    }

    init() {
        this.api.getProductsFromDatabase().then((products) => {
            this.model.setItems(products);
            this.view.renderItems(this.model.getItems());
        });

        this.api.getBagFromDatabase().then((bag) => {
            this.model.setBag(bag);
            this.view.renderPreviewBag(this.model.getBag());
        });

        this.api.getOrdersFromDatabase().then((orders) => {
            if (!orders.length == 0) {
                this.model.setOrders(orders);
                this.view.renderPreviewCompletedOrders(orders);
            }
        });
    }

    // Open new pages

    _handleOpenSelectedOrder = (e) => {
        const clickedItem = e.target;
        if (clickedItem.tagName != "A") return;

        const selectedOrderId = Number(clickedItem.innerText.slice(1));

        const itemsListNode = document.getElementById("previewItemsWrapper");
        const aboutOrderNode = document.getElementById("createdOrder");
        const previewItemsListNode = document.getElementById("previewBag");
        const previewOrdersListNode = document.getElementById(
            "previewCompletedOrders"
        );
        const previewCreatedOrder = document.getElementById(
            "previewCreatedOrder"
        );
        this.view.changeVisibility(
            [itemsListNode, previewItemsListNode, previewCreatedOrder],
            [aboutOrderNode, previewCreatedOrder]
        );

        const orders = this.model.getOrders();
        let selectedOrder;
        orders.forEach((order) => {
            if (selectedOrderId == order.id) {
                selectedOrder = order;
            }
        });
        this.view.renderNewOrder(selectedOrder);

        const goBackNode = document.getElementById("goStartPage");
        goBackNode.addEventListener("click", () => {
            this.view.changeVisibility(
                [aboutOrderNode, previewCreatedOrder],
                [itemsListNode, previewItemsListNode, previewOrdersListNode]
            );
        });
    };

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
            // ADD ITEM TO BAG
            this._handleAddItemToBag(itemId);
        } else {
            // OPEN ITEM CARD
            // Change visible pages
            const itemsListNode = document.getElementById(
                "previewItemsWrapper"
            );
            const itemCardNode = document.getElementById("itemCard");
            this.view.changeVisibility([itemsListNode], [itemCardNode]);
            this.view.renderItemCard(item);

            // Добавить товар в корзину
            const addBtnNode = document.getElementById("addToBagFromItemcard");
            const idItem = addBtnNode.getAttribute("data-item-id");
            addBtnNode.addEventListener("click", () => {
                this._handleAddItemToBag(idItem);
            });

            // Вернуться на прошлую страницу
            const goBackButtonNode =
                document.getElementById("goBackToItemsBtn");
            goBackButtonNode.addEventListener("click", () => {
                this.view.changeVisibility([itemCardNode], [itemsListNode]);
            });
        }
    };

    // refact renderPreview to render
    _handleOpenBag = () => {
        // error empty bag
        if (this.model.getBag().length == 0) {
            this._showEror("emptyBag");
            return;
        }

        // Отображаем корзину и убираем прошлый экран
        const itemsListNode = document.getElementById("previewItemsWrapper");
        const itemCardNode = document.getElementById("itemCard");
        const bagNode = document.getElementById("bag");
        const previewGoBagBtnNode = document.getElementById("previewGoBagBtn");
        const previewBagPriceNode = document.getElementById("previewBagPrice");
        const previewOrdersNode = document.getElementById(
            "previewCompletedOrders"
        );
        this.view.changeVisibility(
            [
                itemsListNode,
                itemCardNode,
                previewGoBagBtnNode,
                previewOrdersNode,
            ],
            [bagNode, previewBagPriceNode]
        );

        this.view.renderPricePreview(this.model.getCost().order);
        this.view.renderBag(this.model.getBag());

        // Кнопка возврата к списку товаров
        const goBackBtn = document.getElementById("goBackFromBagBtn");
        goBackBtn.addEventListener("click", () => {
            this.view.changeVisibility(
                [bagNode, previewBagPriceNode],
                [itemsListNode, previewGoBagBtnNode, previewOrdersNode]
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

    // refact renderPreviewTake to renderTakeOrderItemsList
    // render paytype 2 time. Need to fix!
    _handerOpenTakeOrder = () => {
        if (this.model.getBag().length == 0) {
            this._showEror("emptyOrder");
            return;
        }

        // Open new page
        const bagNode = document.getElementById("bag");
        const takeOrderNode = document.getElementById("takeOrder");

        // Change preview
        const previewBagNode = document.getElementById("previewBag");
        const previewTakeOrder = document.getElementById("previewTakeOrder");
        const previewBagPriceNode = document.getElementById("previewBagPrice");

        this.view.changeVisibility(
            [bagNode, previewBagNode, previewBagPriceNode],
            [takeOrderNode, previewTakeOrder]
        );

        this.view.renderTakeOrderItemsList(
            this.model.getBag(),
            this.model.getCost()
        );

        // Go back btn handler
        const goBackBtnNode = document.getElementById("goBackFromTakeOrder");
        goBackBtnNode.addEventListener("click", () => {
            this.view.changeVisibility(
                [takeOrderNode, previewTakeOrder],
                [bagNode, previewBagNode, previewBagPriceNode]
            );
        });

        // Handler Change Address
        const changeAddressBtnNode =
            document.getElementById("changeAddressBtn");
        changeAddressBtnNode.addEventListener(
            "click",
            this._handlerChangeAddress
        );

        this.view.renderPaytype(
            this.model.getPayTypeMessage(),
            this.model.selectedPaytype
        );

        // Handler Change paytype
        const changePaytypeBtnNode =
            document.getElementById("changePaytypeBtn");
        changePaytypeBtnNode.addEventListener(
            "click",
            this._handlerChangePaytype
        );

        // Handler take order
        const takeOrderBtnNode = document.getElementById("previewTakeOrderBtn");
        takeOrderBtnNode.addEventListener("click", this._handlerTakeOrder);
    };

    _handlerTakeOrder = () => {
        // Create new order && addd it to orders list
        this.model.addNewOrder();
        this.api.setNewOrder(this.model.getNewOrder());

        // open new page
        const takeOrderNode = document.getElementById("takeOrder");
        const createdOrderNode = document.getElementById("createdOrder");
        const previewTakeOrderNode =
            document.getElementById("previewTakeOrder");
        const previewCreatedOrderNode = document.getElementById(
            "previewCreatedOrder"
        );
        this.view.changeVisibility(
            [takeOrderNode, previewTakeOrderNode],
            [createdOrderNode, previewCreatedOrderNode]
        );

        // render preview
        this.view.renderNewOrder(this.model.getNewOrder());

        // Clear old datas
        this.model.clearOldDatas();
        this.api.clearBag();

        // handler go to items btn
        const goStartPage = document.getElementById("goStartPage");
        goStartPage.addEventListener("click", this._handlerGoStartPage);
    };

    // REFACTORED
    // handlers
    _handlerGoStartPage = () => {
        const createdOrderNode = document.getElementById("createdOrder");
        const startPageNode = document.getElementById("previewItemsWrapper");
        const previewCreatedOrderNode = document.getElementById(
            "previewCreatedOrder"
        );
        const previewStartPageNode = document.getElementById("previewBag");
        const previewGoBagBtnNode = document.getElementById("previewGoBagBtn");
        this.view.changeVisibility(
            [previewCreatedOrderNode, createdOrderNode],
            [previewStartPageNode, previewGoBagBtnNode, startPageNode]
        );

        this.view.renderPreviewBag(this.model.getBag());
        this.view.renderPreviewCompletedOrders(this.model.getOrders());
    };

    _handlerChangePaytype = () => {
        const paytypePopupNode = document.getElementById("paytypePopup");
        this.view.openPopup(paytypePopupNode);

        const saveNewPaytypeBtnNode = document.getElementById("saveNewPaytype");
        saveNewPaytypeBtnNode.addEventListener("click", () => {
            this._handlerSavePaytype(paytypePopupNode);
        });
    };

    _handlerChangeAddress = () => {
        const addressPopupNode = document.getElementById("addressPopup");
        this.view.openPopup(addressPopupNode);

        const saveNewAddressBtnNode =
            document.getElementById("saveNewAddressBtn");
        saveNewAddressBtnNode.addEventListener("click", () => {
            this._handlerSaveAddress(addressPopupNode);
        });
    };

    _handlerSavePaytype = (paytypePopupNode) => {
        const radioBtns = paytypePopupNode.querySelectorAll(
            ".pay-type-popup__real-radio"
        );
        radioBtns.forEach((element) => {
            if (element.checked) {
                this.model.setPaytype(element.value);
            }
        });

        this.view.closePopup(paytypePopupNode);

        this.view.renderPaytype(
            this.model.getPayTypeMessage(),
            this.model.selectedPaytype
        );
    };

    _handlerSaveAddress = (addressPopupNode) => {
        const name = document.getElementById("newAddressName").value;
        const street = document.getElementById("newAddressStreet").value;
        const city = document.getElementById("newAddressCity").value;
        const phone = document.getElementById("newAddressPhone").value;

        if (!name && !street && !city && !phone) {
            alert("Заполните все поля");
            return;
        }

        this.model.setAddress({ name, street, city, phone });

        this.view.closePopup(addressPopupNode);

        this.view.renderAddress(this.model.getAddress());
    };

    _handlerChangeAmountItem = (e) => {
        if (e.target.tagName == "UL") return;

        const clickedBtn = e.target.closest("button");

        if (!clickedBtn) return;

        const clickedItemId = e.target
            .closest("li")
            .getAttribute("data-item-id");

        // click on minus button
        if (clickedBtn.classList.contains("bag__change-amount_minus")) {
            this.model.decrementItemToBag(clickedItemId);
            this.view.renderPreviewBag(this.model.getBag());

            if (this.model.getAmountItemToBagById(clickedItemId)) {
                this.api.updateAmountItemBag(
                    clickedItemId,
                    this.model.getAmountItemToBagById(clickedItemId)
                );
            } else {
                this.api.deleteItemFromBag(clickedItemId);
            }

            // render Error if bag is empty
            if (this.model.getBag().length == 0) {
                this._showEror("emptyBag");

                const bagNode = document.getElementById("bag");
                const previewItemsNode = document.getElementById(
                    "previewItemsWrapper"
                );
                const previewGoBagBtnNode =
                    document.getElementById("previewGoBagBtn");
                const previewBagPriceNode =
                    document.getElementById("previewBagPrice");
                this.view.changeVisibility(
                    [bagNode, previewBagPriceNode],
                    [previewItemsNode, previewGoBagBtnNode]
                );
            }
        }
        //click on plus button
        if (clickedBtn.classList.contains("bag__change-amount_plus")) {
            this._handleAddItemToBag(clickedItemId);
        }

        this.view.renderBag(this.model.getBag());
        this.view.renderPricePreview(this.model.getCost().order);
    };

    _handleAddItemToBag(id) {
        const item = this.model.getItemById(id);
        if (this.model.getBagIds().includes(id)) {
            // Increment item
            this.model.incrementItemToBag(id);
            this.api.updateAmountItemBag(
                id,
                this.model.getAmountItemToBagById(id)
            );
        } else {
            // Add item to bag
            this.model.pushItemToBag(item);
            this.api.setItemBag({ ...item, amount: 1 });
        }

        this.view.renderPreviewBag(this.model.getBag());
    }

    _showEror(error) {
        const errorTitle = this.model.getTextByError(error);

        this.view.renderError(errorTitle);
    }
}
