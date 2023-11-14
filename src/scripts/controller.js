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

        this.model.setOrders(this.api.getOrders());
        // console.log(this.model.getCompletedOrders())
        this.view.renderPreviewCompletedOrders(this.model.getCompletedOrders())
        // this.view.renderPreviewCompletedOrders(this.model.getCompletedOrders())
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
        if (this.model.getBag().length == 0) {
            this._showEror("emptyOrder");
            return;
        }

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


        this.view.renderPaytype(this.model.getPayTypeMessage(), this.model.selectedPaytype);
        // Handler Change paytype
        const changePaytypeBtnNode =
            document.getElementById("changePaytypeBtn");
        changePaytypeBtnNode.addEventListener(
            "click",
            this._handlerChangePaytype
        );

        // Handler take order
        const takeOrderBtnNode = document.getElementById('previewTakeOrderBtn');
        takeOrderBtnNode.addEventListener('click', this._handlerTakeOrder)
    };

    _handlerTakeOrder = () => {
        // Create new order && addd it to orders list
        this.model.takeOrder()

        // open new page
        const takeOrderNode = document.getElementById('takeOrder');
        const createdOrderNode = document.getElementById('createdOrder');
        this.view.changeVisibilityPages(takeOrderNode, createdOrderNode);

        //render created order
        // this.view.renderCreatedOrder() 

        // change preview
        const previewTakeOrderNode = document.getElementById('previewTakeOrder');
        const previewCreatedOrderNode = document.getElementById('previewCreatedOrder');
        this.view.changeVisibilityPages(previewTakeOrderNode, previewCreatedOrderNode);

        // render preview
        // this.view.renderPreviewCreatedOrder()


        // // hadnle go back
        // const goItemsBtnNode = document.getElementById('goItemsFromCreatedOrderBtn');
        // goItemsBtnNode.addEventListener('click', () => {
        //     const createdOrderNode = document.getElementById('createdOrder');
        //     const itemsNode = document.getElementById('previewItemsWrapper');
        //     this.view.changeVisibilityPages(createdOrderNode, itemsNode);

        // })
    }

    // handlers
    _handlerChangePaytype = () => {
        const paytypePopupNode = document.getElementById('paytypePopup');
        paytypePopupNode.classList.add('visible');
        document.body.classList.add("fixe-scroll");

        const saveNewPaytypeBtnNode = document.getElementById('saveNewPaytype');
        saveNewPaytypeBtnNode.addEventListener('click', () => {
            this._handlerSavePaytype(paytypePopupNode)
        })
    };

    _handlerChangeAddress = () => {
        const addressPopupNode = document.getElementById("addressPopup");
        // this.view.changeVisibilityPopup(addressPopupNode);
        addressPopupNode.classList.add('visible');
        document.body.classList.add("fixe-scroll");

        const saveNewAddressBtnNode =
            document.getElementById("saveNewAddressBtn");
        saveNewAddressBtnNode.addEventListener("click", () => {
            this._handlerSaveAddress(addressPopupNode);
        });

    };


    _handlerSavePaytype = (paytypePopupNode) => {
        const radioBtns = paytypePopupNode.querySelectorAll('.pay-type-popup__real-radio');
        radioBtns.forEach(element => {
            if (element.checked) {
                this.model.setPaytype(element.value)
            }
        });

        paytypePopupNode.classList.remove('visible');
        document.body.classList.remove("fixe-scroll");
        this.view.renderPaytype(this.model.getPayTypeMessage(), this.model.selectedPaytype);
    }

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
        addressPopupNode.classList.remove('visible');
        document.body.classList.remove("fixe-scroll");
        this.view.renderAddress(this.model.getAddress());
    };

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
