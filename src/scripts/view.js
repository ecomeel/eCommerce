const CLASSNAME_CHANGE_VISIBILITY = "visible";

export default class View {
    constructor({ userClickedItem }) {
        this.itemsListNode = document.getElementById("itemsList");
        this.itemCardNode = document.getElementById("itemCard");
        this.previewBagItemsNode = document.getElementById("previewBagItems");

        this.itemsListNode.addEventListener("click", userClickedItem);
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

    changeVisibilityPages(prevPage, nextPage) {
        prevPage.classList.toggle(CLASSNAME_CHANGE_VISIBILITY);
        nextPage.classList.toggle(CLASSNAME_CHANGE_VISIBILITY);
    }
}

// Сделано добавление товара в корзину и превью
// Переделать рендер препью корзины
