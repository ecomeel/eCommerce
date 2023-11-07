import View from "./view";
import Model from "./model";
import Api from "./api";

import "../styles/scss/style.scss";

const ATTRIBUTE_ID_SELECTED_ITEM = "data-item-id";

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

        if (elementClicked.classList.contains("js-items-add-to-bag")) {
            // Клик по кнопки добавить в корзину
            this._handleAddItemToBag(item);
        } else {
            // Клик по продукту
            this._openNextPage(selectedItemNode, item);
            this.view.renderItemCard(item);

            this._listenerGoPreviousPage("goBackToItemsBtn");

            this._listenerAddToBag("addToBagFromItemcard");
        }
    };

    _handleOpenBag = () => {
        console.log(this.model.getBagItems())
        if (this.model.getBagItems().length == 0) {
            console.log('bag is empty')
            const emptyErrorPage = document.getElementById('NoProductErrorPage')
            emptyErrorPage.classList.add('visible');

            // Получаем с модели сообщение ошибки

            // Отрисовываем техт ошибки на странице

            // Делаем листенер закрытия страницы
            const btnClosePage = document.getElementById('closeErrorPageBtn');
            btnClosePage.addEventListener('click', () => {
                emptyErrorPage.classList.remove('visible')
            })


        }
    }

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

    _handlerClosePopup() {

    }

    _listenerGoPreviousPage(goBackBtnID) {
        const backButton = document.getElementById(goBackBtnID);
        backButton.addEventListener("click", () =>
            this._handlerOpenPreviousPage(backButton)
        );
    }

    _listenerAddToBag(addBtnId) {
        const addBtnNode = document.getElementById(addBtnId);
        const idItem = addBtnNode.getAttribute(ATTRIBUTE_ID_SELECTED_ITEM);
        addBtnNode.addEventListener("click", () => {
            this._handleAddItemToBag(this.model.getItemById(idItem));
        });
    }
}
