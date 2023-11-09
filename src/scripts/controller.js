import View from "./view";
import Model from "./model";
import Api from "./api";

import "../styles/scss/style.scss";

const ERROR_NAME_NO_PRODUCT = "noProduct";
const ERROR_NAME_EMPTY_BAG = "emptyBag";
const CLASSNAME_ITEMS_ADD_TO_BAG_BTN = "js-items-add-to-bag";
const ID_GO_BACK_TO_ITEMS_BTN = "goBackToItemsBtn";
const ID_ADD_TO_BAG_FROM_ITEMCARD_BTN = "addToBagFromItemcard";

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
        // console.log(this.model.getOrderCost());
    }

    // Open new pages
    _handleOpenSelectedItem = (e) => {
        const elementClicked = e.target;
        const selectedItemNode = elementClicked.closest("li");

        if (selectedItemNode == null) return;

        const itemId = selectedItemNode.getAttribute("data-item-id");
        const item = this.model.getItemById(itemId);

        if (!item) {
            this._showEror(ERROR_NAME_NO_PRODUCT);
            return;
        }

        const onAddToBagBtnClick = elementClicked.classList.contains(
            CLASSNAME_ITEMS_ADD_TO_BAG_BTN
        );

        if (onAddToBagBtnClick) {
            this._handleAddItemToBag(item);
        } else {
            this._openNextPage(selectedItemNode);
            this.view.renderItemCard(item);

            this._listenGoPreviousPage(ID_GO_BACK_TO_ITEMS_BTN);
            this._listenAddToBag(ID_ADD_TO_BAG_FROM_ITEMCARD_BTN);
        }
    };

    _handleOpenBag = () => {
        if (this.model.getBag().length == 0) {
            this._showEror(ERROR_NAME_EMPTY_BAG);
            return;
        }

        console.log("Bag :", this.model.getBag());

        //  Отображаем корзину и убираем прошлый экран
        // Отрефакторить
        const itemsList = document.getElementById("itemsList");
        const itemCardNode = document.getElementById("itemCard");
        const bagNode = document.getElementById("bag");
        bagNode.classList.add("visible");
        itemCardNode.classList.remove("visible");
        itemsList.classList.remove("visible");

        //Закрытие корзины
        const goBackFromBagBtnNode =
            document.getElementById("goBackFromBagBtn");
        goBackFromBagBtnNode.addEventListener("click", () => {
            bagNode.classList.remove("visible");
            itemsList.classList.add("visible");
        });

        // Отображение корзины
        this.view.renderBag(this.model.getBag());

        //Отслеживание изменения количества товаров
        const bagItemsListNode = document.getElementById("bagItemsList");
        bagItemsListNode.addEventListener("click", (e) => {
            const product = e.target.closest("li");
            if (!product) return;
    
            const clickedButton = e.target.closest("button");
            if (!clickedButton) return;
    
            const idProduct = product.getAttribute("data-item-id");
    
            if (clickedButton.classList.contains("bag__change-amount_plus")) {
                this.model.incrementItemToBag(idProduct);
                this.view.renderBag(this.model.getBag())
                // this.model.incrementItemToBag()
                // this.view.renderBag(this.model.getBag())
            } else {
                console.log("minus");
            }
        });

        // Отображение preview price
        // this.view.renderPreviewPrice()
    };

    // handlers

    // _handleChangeAmountItems(e) {
    //     const product = e.target.closest("li");
    //     if (!product) return;

    //     const clickedButton = e.target.closest("button");
    //     if (!clickedButton) return;

    //     const idProduct = product.getAttribute("data-item-id");

    //     if (clickedButton.classList.contains("bag__change-amount_plus")) {
    //         // this.model.incrementItemToBag()
    //         // this.view.renderBag(this.model.getBag())
    //         this.view.checkoutFail()
    //     } else {
    //         console.log("minus");
    //     }
    // }

    _handleAddItemToBag(item) {
        this.model.addItemToBag(item);
        console.log(this.model.getBag());
        this.view.renderPreviewBag(this.model.getBag());
    }

    _openNextPage(itemClickNode) {
        const prevPageNode = itemClickNode.parentElement;
        const nextPageNode = prevPageNode.nextElementSibling;
        this.view.changeVisibilityPages(prevPageNode, nextPageNode);
    }

    _handlerOpenPreviousPage(itemClickNode) {
        const prevPageNode = itemClickNode.parentElement;
        const nextPageNode = prevPageNode.previousElementSibling;
        this.view.changeVisibilityPages(prevPageNode, nextPageNode);
    }

    _listenGoPreviousPage(goBackBtnID) {
        const backButton = document.getElementById(goBackBtnID);
        backButton.addEventListener("click", () =>
            this._handlerOpenPreviousPage(backButton)
        );
    }

    _listenAddToBag(addBtnId) {
        const addBtnNode = document.getElementById(addBtnId);
        const idItem = addBtnNode.getAttribute("data-item-id");
        addBtnNode.addEventListener("click", () => {
            this._handleAddItemToBag(this.model.getItemById(idItem));
        });
    }

    _showEror(error) {
        const errorTitle = this.model.getTextByError(error);
        this.view.renderError(errorTitle);
    }
}
