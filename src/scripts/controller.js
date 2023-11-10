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

        // //  Отображаем корзину и убираем прошлый экран
        // // Отрефакторить
        // const itemsList = document.getElementById("itemsList");
        // const itemCardNode = document.getElementById("itemCard");
        // const bagNode = document.getElementById("bag");
        // bagNode.classList.add("visible");
        // itemCardNode.classList.remove("visible");
        // itemsList.classList.remove("visible");
        // // Отображение корзины
        // this.view.renderBag(this.model.getBag());
        // //Отслеживание изменения количества товаров
        // const bagItemsListNode = document.getElementById("bagItemsList");
        // bagItemsListNode.addEventListener("click", (e) =>
        //     this._handleChangeAmountItem(e)
        // );
        // // Отображение preview price
        // // this.view.renderPreviewPrice()
        // //Закрытие корзины
        // const goBackFromBagBtnNode =
        //     document.getElementById("goBackFromBagBtn");
        // goBackFromBagBtnNode.addEventListener("click", () => {
        //     bagNode.classList.remove("visible");
        //     itemsList.classList.add("visible");
        // });
        // // Смена preview
        // const goToBagBtnNode = document.getElementById('goToBagBtn');
        // const previewPriceNode = document.getElementById('previewPrice');
        // goToBagBtnNode.classList.remove('visible')
        // previewPriceNode.classList.add('visisble')
    };

    // handlers

    // _handleChangeAmountItem(e) {
    //     const productNode = e.target.closest("li");
    //     if (!productNode) return;

    //     const clickedButton = e.target.closest("button");
    //     if (!clickedButton) return;

    //     const idProduct = productNode.getAttribute("data-item-id");

    //     console.log(productNode);

    //     if (clickedButton.classList.contains("bag__change-amount_plus")) {
    //         this.model.incrementItemToBag(idProduct);
    //     } else {
    //         this.model.decrementItemToBag(idProduct);
    //     }
    //     this.view.renderBag(this.model.getBag());

    //     // this.view.renderPreviewBag(this.model.getBag());
    //     console.log("Bag changed :", this.model.getBag());
    // }

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
