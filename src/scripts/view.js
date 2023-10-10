export default class View {
    constructor({ userSelectedItem }) {
        this.itemsListNode = document.getElementById("itemsList");
        this.userSelectedItem = userSelectedItem

        this.itemsListNode.addEventListener('click', this._handleSelectItem)
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





    renderChangePage(hidePage, showPage) {
        hidePage(hidePage);
        showPage(showPage);
    }

    hidePage(page) {
        console.log(page) 
    }

    showPage(page) {
        console.log(page) 
    }

    _handleSelectItem = (e) => {
        this.userSelectedItem(e.target)
    }
}