const CLASSNAME_CHANGE_VISIBILITY = "visible";

export default class View {
    constructor({ userClickedItem, userGoToBag, userSelectedOrder }) {
        this.itemsListNode = document.getElementById("itemsList");
        this.previewBagItemsNode = document.getElementById("previewBagItems");
        this.previewCompletedOrderListNode = document.getElementById(
            "previewCompletedOrdersList"
        );
        this.previewCompletedOrdersNode = document.getElementById(
            "previewCompletedOrders"
        );
        this.previewCreatedOrderNode = document.getElementById('previewCreatedOrder')
        this.itemCardNode = document.getElementById("itemCard");
        this.bagItemsListNode = document.getElementById("bagItemsList");
        this.takeOrderItemsListNode =
            document.getElementById("takeOrderItemsList");
        this.createdOrderNode = document.getElementById("createdOrder");
        this.goToBagBtnNode = document.getElementById("goToBagBtn");
        this.previewOrderCostNode = document.getElementById('previewOrderCost')

        this.addressDatasWrapperNode = document.getElementById(
            "addressDatasWrapper"
        );
        this.addressNode = document.getElementById('address');
        this.selectedPaytypeNode = document.getElementById('selectedPaytype');

        this.errorPageNode = document.getElementById('errorPage')

        this.itemsListNode.addEventListener("click", userClickedItem);
        this.goToBagBtnNode.addEventListener("click", userGoToBag);
        this.previewCompletedOrderListNode.addEventListener(
            "click",
            userSelectedOrder
        );
    }

    renderItems(items) {
        let itemsListHTML = "";
        items.forEach((item) => {
            itemsListHTML += `
            <li data-item-id="${item.id}" class="preview-item">
                <img
                    class="preview-item__img"
                    src=${item.imgSrc}
                />
                <h3 class="preview-item__name">${item.name}</h3>
                <p class="preview-item__model">${item.model}</p>
                <div class="to-bag-wrapper">
                    <p class="preview-item__price">${item.price}$</p>
                    <img
                        src="img/buttons/to-bag-mini.png"
                        alt=""
                        class="js-items-add-to-bag preview-item__to-bag-btn black-btn"
                    />
                </div>
            </li>`;
        });
        this.itemsListNode.innerHTML = itemsListHTML;
    }

    renderPreviewBag(bag) {
        let previewBagHTML = "";
        bag.forEach((item) => {
            previewBagHTML =
                previewBagHTML +
                `<li class="preview-bag__item">
                    <img
                        class="preview-bag__img"
                        src="${item.imgSrc}"
                        alt=""
                    />
                </li>`;
        });
        this.previewBagItemsNode.innerHTML = previewBagHTML;
    }

    renderPreviewCompletedOrders(orders) {
        this.previewCompletedOrdersNode.classList.add(
            CLASSNAME_CHANGE_VISIBILITY
        );

        const completedOrdersListNode = document.getElementById(
            "previewCompletedOrdersList"
        );
        let completedOrdersHTML = "";
        orders.forEach((order) => {
            completedOrdersHTML += `
                <li class="preview-orders__order">
                    <a>#${order.id}</a>
                </li>
            `;
        });
        completedOrdersListNode.innerHTML = completedOrdersHTML;
    }

    renderItemCard(item) {
        let itemCardHTML = `
        <button id='goBackToItemsBtn' class="go-back-btn">
            <img src="img/buttons/back.png" alt="" />
            <p class="go-back-btn__text">Список товаров</p>
        </button>
        <div class="item-card__main-info">
            <img
                class="item-card__image"
                src=${item.imgSrc}
                alt=""
            />
        <div class="text-wrapper">
            <h3 class="item-card__name">${item.name}</h3>
            <p class="item-card__model">${item.model}</p>
            <div class="rating">
                <img
                    class="rating__star"
                    src="img/buttons/star.png"
                    alt="star"
                />
                <img
                    class="rating__star"
                    src="img/buttons/star.png"
                    alt="star"
                />
                <img
                    class="rating__star"
                    src="img/buttons/star.png"
                    alt="star"
                />
                <img
                    class="rating__star"
                    src="img/buttons/star.png"
                    alt="star"
                />
                <img
                    class="rating__star"
                    src="img/buttons/half-star.png"
                    alt="half-star"
                />
                <p class="rating__value">4.5 / 5</p>
            </div>
            <p class="item-card__price">$ ${item.price}</p>
            <p class="item-card__short-desc">
            ${item.mainDesc}
            </p>
            <div class="item-card__btn-wrapper">
                <button
                    class="item-card__add-to-bag-btn black-btn"
                    data-item-id=${item.id}
                    id="addToBagFromItemcard"
                >
                    <img
                        src="img/buttons/to-bag-big.png"
                        alt="to bag btn"
                    />
                    <p class="">В корзину</p>
                </button>
            </div>
        </div>
        </div>
                            <div class="item-card__description">
                                <h2 class="subtitle">Описание</h2>
                                <p class="item-card__full-desc">
                                    ${item.fullDesc}
                                </p>
                            </div>`;
        this.itemCardNode.innerHTML = itemCardHTML;
    }

    renderBag(bag, price) {
        let bagHTML = "";
        bag.forEach((item) => {
            bagHTML += `
                <li data-item-id=${item.id} class="bag__item bag-item">
                <img
                    class="bag-item__img"
                    src=${item.imgSrc}
                    alt=${item.name}
                />
                <div class="bag-item__text">
                    <h3 class="bag-item__name">
                        ${item.name}
                    </h3>
                    <p class="bag-item__model">
                        ${item.model}
                    </p>
                    <p class="bag-item__description">
                        ${item.shortDesc}
                    </p>
                    <div class="rating">
                        <img
                            class="rating__star"
                            src="img/buttons/star.png"
                            alt="star"
                        />
                        <img
                            class="rating__star"
                            src="img/buttons/star.png"
                            alt="star"
                        />
                        <img
                            class="rating__star"
                            src="img/buttons/star.png"
                            alt="star"
                        />
                        <img
                            class="rating__star"
                            src="img/buttons/star.png"
                            alt="star"
                        />
                        <img
                            class="rating__star"
                            src="img/buttons/half-star.png"
                            alt="half-star"
                        />
                        <p class="rating__value">${item.rating} / 5</p>
                    </div>
                    <div class="bag__cost">
                        <p class="bag__price">
                            $ ${item.price} x ${item.amount}
                        </p>
                        <div class="bag__amount">
                            <button
                                class="bag__change-amount-btn bag__change-amount_minus"
                            >
                                <img
                                    src="img/buttons/minus-btn.png"
                                    alt="minus"
                                />
                            </button>
                            <p class="js-bag__num-products bag__num-products">
                                ${item.amount}
                            </p>
                            <button
                                class="bag__change-amount-btn bag__change-amount_plus"
                            >
                                <img
                                    src="img/buttons/plus-btn.png"
                                    alt="plus"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </li>`;
        });
        this.bagItemsListNode.innerHTML = bagHTML;

        this._renderPricePreview(price);
    }

    renderTakeOrder(bag, cost) {
        let takeOrderListHTML = "";

        bag.forEach((item) => {
            takeOrderListHTML += `
            <li class="bag__item bag-item">
                <img
                    class="bag-item__img"
                    src=${item.imgSrc}
                    alt=${item.name}
                />
                <div class="bag-item__text">
                    <h3 class="bag-item__name">
                        ${item.name}
                    </h3>
                    <p class="bag-item__model">
                        ${item.model}
                    </p>
                    <p class="bag-item__description">
                        ${item.shortDesc}
                    </p>
                    <div class="rating">
                        <img
                            class="rating__star"
                            src="img/buttons/star.png"
                            alt="star"
                        />
                        <img
                            class="rating__star"
                            src="img/buttons/star.png"
                            alt="star"
                        />
                        <img
                            class="rating__star"
                            src="img/buttons/star.png"
                            alt="star"
                        />
                        <img
                            class="rating__star"
                            src="img/buttons/star.png"
                            alt="star"
                        />
                        <img
                            class="rating__star"
                            src="img/buttons/half-star.png"
                            alt="half-star"
                        />
                        <p class="rating__value">
                            ${item.rating} / 5
                        </p>
                    </div>
                    <div class="bag__cost">
                        <p class="bag__price">
                            $ ${item.price} x ${item.amount}
                        </p>
                    </div>
                </div>
            </li>
            `;
        });

        this.takeOrderItemsListNode.innerHTML = takeOrderListHTML;

        this._renderTakeOrderPreview(cost);
    }

    //new Order
    renderNewOrder(newOrder) {
        const newOrderTitleHTML = `
            <h2 class="order__title">Заказ №${newOrder.id}</h2>
        `;
        const goBackBtnHTML = `
            <button
                id="goStartPage"
                class="go-back-btn"
            >
                <img src="img/buttons/back.png" alt="back" />
                <p class="go-back-btn__text">Список товаров</p>
            </button>
        `;
        const newOrderAddressHTML = `
            <div class="address">
                <h2 class="order__title subtitle">
                    Адрес доставки
                </h2>
                <div class="address__content">
                    <p class="address__name">${newOrder.address.name}</p>
                    <p class="address__street">
                        ${newOrder.address.street}
                    </p>
                    <p class="address__city">${newOrder.address.city}</p>
                    <p class="address__phone">
                        ${newOrder.address.phone}
                    </p>
                </div>
            </div>
        `;
        const newOrderPaytypeHTML = `
        <div class="pay-type">
            <h2 class="order__title subtitle">
                Способ оплаты
            </h2>
            <div class="pay-type__selector">
                <p class="pay-type__result">
                    <img
                        class="pay-type__result-img"
                        src="img/buttons/${newOrder.paytype.selectedPaytype}-pay.png"
                        alt="card"
                    />
                    ${newOrder.paytype.paytypeMessage}
                </p>
            </div>
        </div>
        `;
        let ordersListHTML = "";

        newOrder.order.forEach((item) => {
            ordersListHTML += `
            <li class="bag__item bag-item">
                <img
                    class="bag-item__img"
                    src=${item.imgSrc}
                    alt=${item.name}
                />
                <div class="bag-item__text">
                    <h3 class="bag-item__name">
                        ${item.name}
                    </h3>
                    <p class="bag-item__model">
                        ${item.model}
                    </p>
                    <p class="bag-item__description">
                        ${item.shortDesc}
                    </p>
                    <div class="rating">
                        <img
                            class="rating__star"
                            src="img/buttons/star.png"
                            alt="star"
                        />
                        <img
                            class="rating__star"
                            src="img/buttons/star.png"
                            alt="star"
                        />
                        <img
                            class="rating__star"
                            src="img/buttons/star.png"
                            alt="star"
                        />
                        <img
                            class="rating__star"
                            src="img/buttons/star.png"
                            alt="star"
                        />
                        <img
                            class="rating__star"
                            src="img/buttons/half-star.png"
                            alt="half-star"
                        />
                        <p class="rating__value">${item.rating} / 5</p>
                    </div>
                    <div class="bag__cost">
                        <p class="bag__price">
                            $ ${item.price} x ${item.amount}
                        </p>
                    </div>
                </div>
            </li>
            `;
        });
        const newOrderBagListHTML = `
        <ul class="order__bag-list">
            ${ordersListHTML}
        </ul>
        `;

        this.createdOrderNode.innerHTML =
            goBackBtnHTML +
            newOrderTitleHTML +
            newOrderAddressHTML +
            newOrderPaytypeHTML +
            newOrderBagListHTML;

        this._renderNewOrderPreview(newOrder.cost);
    }

    renderAddress(address) {
        this.addressDatasWrapperNode.innerHTML = `
            <p class="address__name">${address.name}</p>
            <p class="address__street">${address.street}</p>
            <p class="address__city">${address.city}</p>
            <p class="address__phone">${address.phone}</p>
        `;
    }
    showErrorEmptyAddress() {
        this.addressNode.classList.add("red-border");
        alert("Не указан адрес доставки");
    }
    hideRedBorder() {
        this.addressNode.classList.remove("red-border");
    }

    renderPaytype(paytypeMessage, selectedPaytype) {
        this.selectedPaytypeNode.innerHTML = `
            <img
                class="pay-type__result-img"
                src="img/buttons/${selectedPaytype}-pay.png"
                alt="card"
            />
            <p>${paytypeMessage}</p>
        `;
    }

    renderError(error) {
        this.errorPageNode.innerHTML = `
            <div class="container">
                <button id="closeErrorPageBtn" class="go-back-btn">
                    <img src="img/buttons/back.png" alt="" />
                    <p class="go-back-btn__text">Список товаров</p>
                </button>
                <h2 id="errorTitle" class="title">${error}</h2>
            </div>
        `;
        this.errorPageNode.classList.add(CLASSNAME_CHANGE_VISIBILITY)
        document.getElementById('closeErrorPageBtn').addEventListener('click', () => {
            this.errorPageNode.classList.remove(CLASSNAME_CHANGE_VISIBILITY);
        })
    }

    changeVisibility(closePages, openPages) {
        closePages.forEach((closePage) => {
            closePage.classList.remove(CLASSNAME_CHANGE_VISIBILITY);
        });
        openPages.forEach((openPage) => {
            openPage.classList.add(CLASSNAME_CHANGE_VISIBILITY);
        });
    }

    openPopup(popupNode) {
        popupNode.classList.add("visible");
        document.body.classList.add("fixe-scroll");
    }

    closePopup(popupNode) {
        popupNode.classList.remove("visible");
        document.body.classList.remove("fixe-scroll");
    }

    _renderPricePreview(price) {
        this.previewOrderCostNode.innerText = `Сумма: $ ${price}`;
    }

    _renderNewOrderPreview(cost) {
        this.previewCreatedOrderNode.innerHTML = `
            <h3 class="preview-make-order__title">Сумма</h3>
            <div class="preview-make-order__price">
                <p>Товары</p>
                <p>$ ${cost.order}</p>
            </div>
            <div class="preview-make-order__price">
                <p>Доставка</p>
                <p>$ ${cost.delivery}</p>
            </div>
            <div
                class="preview-make-order__total preview-make-order__total_done"
            >
                <p>Стоимость</p>
                <p>$ ${cost.order + cost.delivery}</p>
            </div>
        `;
    }

    _renderTakeOrderPreview(cost) {
        document.getElementById(
            "previewTakeOrderCost"
        ).innerText = `$ ${cost.order}`;
        document.getElementById(
            "previewTakeOrderDeliveryCost"
        ).innerText = `$ ${cost.delivery}`;
        document.getElementById("previewTakeOrderFinalCost").innerText = `$ ${
            cost.order + cost.delivery
        }`;
    }
}
