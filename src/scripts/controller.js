import View from "./view";
import Model from "./model";
import Api from "./api";

import "../styles/scss/style.scss";

const ATTRIBUTE_ID_SELECTED_ITEM = "data-item-id";
const ERROR_NAME_NO_PRODUCT = "noProduct";
const ERROR_NAME_EMPTY_BAG = "emptyBag";
const CLASSNAME_ITEMS_ADD_TO_BAG_BTN = "js-items-add-to-bag";
const ID_GO_BACK_TO_ITEMS_BTN = 'goBackToItemsBtn';
const ID_ADD_TO_BAG_FROM_ITEMCARD_BTN = '"addToBagFromItemcard"'

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

        this.model.setBagItems(this.api.getBagItems());
        this.view.renderPreviewBag(this.model.getBagItems());
    }

    // Open new pages

    _handleOpenSelectedItem = (e) => {
        const elementClicked = e.target;
        const selectedItemNode = elementClicked.closest("li");

        if (selectedItemNode == null) return;

        const itemId = selectedItemNode.getAttribute(
            ATTRIBUTE_ID_SELECTED_ITEM
        );
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
        if (this.model.getBagItems().length == 0) {
            this._showEror(ERROR_NAME_EMPTY_BAG);
            return;
        }
    };

    // handlers

    _handleAddItemToBag(item) {
        this.model.addItemToBag(item);
        this.view.renderPreviewBag(this.model.getBagItems());
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

    _handlerClosePopup() {}

    _listenGoPreviousPage(goBackBtnID) {
        const backButton = document.getElementById(goBackBtnID);
        backButton.addEventListener("click", () =>
            this._handlerOpenPreviousPage(backButton)
        );
    }

    _listenAddToBag(addBtnId) {
        const addBtnNode = document.getElementById(addBtnId);
        const idItem = addBtnNode.getAttribute(ATTRIBUTE_ID_SELECTED_ITEM);
        addBtnNode.addEventListener("click", () => {
            this._handleAddItemToBag(this.model.getItemById(idItem));
        });
    }

    _showEror(error) {
        const errorTitle = this.model.getTextByError(error);
        this.view.renderError(errorTitle);
    }
}
