const CLASSNAME_CHANGE_VISIBILITY = "visible";

export default class View {
    constructor({ userClickedItem, userGoToBag, changeAmountItems }) {
        this.itemsListNode = document.getElementById("itemsList");
        this.itemCardNode = document.getElementById("itemCard");
        this.previewBagItemsNode = document.getElementById("previewBagItems");
        this.goToBagBtnNode = document.getElementById("goToBagBtn");

        this.itemsListNode.addEventListener("click", userClickedItem);
        this.goToBagBtnNode.addEventListener("click", userGoToBag);
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

    renderPreviewBag(items) {
        let previewBagHTML = "";
        items.forEach((item) => {
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

    renderBag(bag) {
        const bagItemsListNode = document.getElementById('bagItemsList')
        let bagHTML = '';
        bag.forEach(item => {
            bagHTML = `
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
                            <p class="bag__num-products">
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
            </li>` + bagHTML;

        });
        bagItemsListNode.innerHTML = bagHTML;
    }

    // renderPreviewPrice() {

    // }

    renderError(error) {
        const errorPageNode = document.getElementById("errorPage");
        errorPageNode.classList.add(CLASSNAME_CHANGE_VISIBILITY);

        const errorTitleNode = document.getElementById("errorTitle");
        errorTitleNode.innerText = error;

        const btnClosePage = document.getElementById("closeErrorPageBtn");
        btnClosePage.addEventListener("click", () => {
            errorPageNode.classList.remove(CLASSNAME_CHANGE_VISIBILITY);
        });
    }

    changeVisibilityPages(prevPage, nextPage) {
        prevPage.classList.toggle(CLASSNAME_CHANGE_VISIBILITY);
        nextPage.classList.toggle(CLASSNAME_CHANGE_VISIBILITY);
    }
}
