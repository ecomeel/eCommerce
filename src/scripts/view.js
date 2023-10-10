export default class View {
    constructor() {
        this.itemsListNode = document.getElementById("itemsList");
    }

    renderItems(items) {
        let itemsListHTML = "";
        items.forEach((item) => {
            itemsListHTML += `
            <li class="preview-item">
                <img
                    class="preview-item__img"
                    src=${item.imgSrc}
                />
                <h3 class="preview-item__name">${item.name}</h3>
                <p class="preview-item__model">${item.model}</p>
                <div class="to-bag-wrapper">
                    <p class="preview-item__price">${item.price}$</p>
                    <button
                        class="preview-item__to-bag-btn black-btn"
                    >
                        <img
                            src="img/buttons/to-bag-mini.png"
                            alt=""
                        />
                    </button>
                </div>
            </li>`;
        });
        this.itemsListNode.innerHTML = itemsListHTML;
    }
}
