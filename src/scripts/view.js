export default class View {
    constructor({ userClickedItem }) {
        this.itemsListNode = document.getElementById("itemsList");
        this.itemCardNode = document.getElementById("itemCard");

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

    renderItemCard(item) {
        let itemCardHTML = `
        <button class="go-back-btn">
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

    renderChangePage(hidePageNode, showPageNode) {
        this._hidePage(hidePageNode);
        this._showPage(showPageNode);
    }

    _hidePage(page) {
        page.classList.add("deactivated");
    }

    _showPage(page) {
        page.classList.add("activated");
    }
}
