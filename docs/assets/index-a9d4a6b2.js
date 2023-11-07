var c=Object.defineProperty;var l=(r,e,t)=>e in r?c(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var m=(r,e,t)=>(l(r,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();const n="visible";class u{constructor({userClickedItem:e,userGoToBag:t}){this.itemsListNode=document.getElementById("itemsList"),this.itemCardNode=document.getElementById("itemCard"),this.previewBagItemsNode=document.getElementById("previewBagItems"),this.goToBagBtnNode=document.getElementById("goToBagBtn"),this.itemsListNode.addEventListener("click",e),this.goToBagBtnNode.addEventListener("click",t)}renderItems(e){let t="";e.forEach(i=>{t+=`
            <li data-item-id="${i.id}" class="preview-item">
                <img
                    class="preview-item__img"
                    src=${i.imgSrc}
                />
                <h3 class="preview-item__name">${i.name}</h3>
                <p class="preview-item__model">${i.model}</p>
                <div class="to-bag-wrapper">
                    <p class="preview-item__price">${i.price}$</p>
                    <img
                        src="img/buttons/to-bag-mini.png"
                        alt=""
                        class="js-items-add-to-bag preview-item__to-bag-btn black-btn"
                    />
                </div>
            </li>`}),this.itemsListNode.innerHTML=t}renderPreviewBag(e){let t="";e.forEach(i=>{t=t+`<li class="preview-bag__item">
                    <img
                        class="preview-bag__img"
                        src="${i.imgSrc}"
                        alt=""
                    />
                </li>`}),this.previewBagItemsNode.innerHTML=t}renderItemCard(e){let t=`
        <button id='goBackToItemsBtn' class="go-back-btn">
            <img src="img/buttons/back.png" alt="" />
            <p class="go-back-btn__text">Список товаров</p>
        </button>
        <div class="item-card__main-info">
            <img
                class="item-card__image"
                src=${e.imgSrc}
                alt=""
            />
        <div class="text-wrapper">
            <h3 class="item-card__name">${e.name}</h3>
            <p class="item-card__model">${e.model}</p>
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
            <p class="item-card__price">$ ${e.price}</p>
            <p class="item-card__short-desc">
            ${e.mainDesc}
            </p>
            <div class="item-card__btn-wrapper">
                <button
                    class="item-card__add-to-bag-btn black-btn"
                    data-item-id=${e.id}
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
                                    ${e.fullDesc}
                                </p>
                            </div>`;this.itemCardNode.innerHTML=t}renderError(e){const t=document.getElementById("errorPage");t.classList.add(n);const i=document.getElementById("errorTitle");i.innerText=e,document.getElementById("closeErrorPageBtn").addEventListener("click",()=>{t.classList.remove(n)})}changeVisibilityPages(e,t){e.classList.toggle(n),t.classList.toggle(n)}}function g(r){const e=[];let t={};return r.forEach(i=>{e.push(i.id),t={...t,[i.id]:i}}),[e,t]}function p(r){const e=[];let t={};return r.forEach(i=>{e.push(i.id),t[i.id]=i.amount}),[e,t]}class h{constructor(){this.itemsIDs=[],this.itemById={},this.bagItemsIds=[],this.bagNumItemsById={},this.errors={noProduct:"Упс, ошибка. Такого товара нет.",emptyBag:"Корзина пуста",emptyOrder:"В заказе не товаров",notFoundOrder:"Страница не найдена"}}setItems(e){[this.itemsIDs,this.itemById]=g(e)}getItems(){const e=[];return this.itemsIDs.forEach(t=>{e.push(this.getItemById(t))}),e}getItemsIDs(){return this.itemsIDs}getItemById(e){return this.itemById[e]}setBagItems(e){[this.bagItemsIds,this.bagNumItemsById]=p(e)}addItemToBag(e){const t=e.id;this.bagItemsIds.includes(t)?this.bagNumItemsById[t]=this.bagNumItemsById[t]+1:(this.bagItemsIds.push(t),this.bagNumItemsById[t]=1),console.log(this.bagNumItemsById)}getBagItems(){const e=[];return this.bagItemsIds.forEach(t=>{e.push(this.getItemById(t))}),e}getTextByError(e){return this.errors[e]}}class b{constructor(){this.itemsMock=[{id:1,name:"Apple watch",model:"Series 5 SE",price:529,imgSrc:"./img/products/apple-watch.png",shortDesc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, ratione?",mainDesc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi temporibus magnam dolorem nobis repellendus alias ab aspernatur error illum dolores.",fullDesc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat eius repellendus, omnis dolorum dolor et est natus quae tempora quidem labore sequi possimus quia ex odit cupiditate, excepturi provident reiciendis exercitationem eos. Quidem sunt quibusdam eius, qui autem soluta magni deserunt corrupti fugit velit architecto nam et magnam ut, officia nemo labore voluptatibus est consequatur quaerat tempore placeat, provident veritatis! Debitis aspernatur voluptatibus sapiente sed nisi dolorum eius enim at officia similique ipsa, laboriosam pariatur aliquam eum dolore corporis quas temporibus, deserunt fugit non atque, necessitatibus illo. Cum laborum sed ullam, ab consequatur natus nemo perspiciatis odit porro quisquam consectetur!",rating:4},{id:2,name:"Apple watch 2",model:"Series 5 SE",price:529,imgSrc:"./img/products/apple-watch.png",shortDesc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, ratione?",mainDesc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi temporibus magnam dolorem nobis repellendus alias ab aspernatur error illum dolores.",fullDesc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat eius repellendus, omnis dolorum dolor et est natus quae tempora quidem labore sequi possimus quia ex odit cupiditate, excepturi provident reiciendis exercitationem eos. Quidem sunt quibusdam eius, qui autem soluta magni deserunt corrupti fugit velit architecto nam et magnam ut, officia nemo labore voluptatibus est consequatur quaerat tempore placeat, provident veritatis! Debitis aspernatur voluptatibus sapiente sed nisi dolorum eius enim at officia similique ipsa, laboriosam pariatur aliquam eum dolore corporis quas temporibus, deserunt fugit non atque, necessitatibus illo. Cum laborum sed ullam, ab consequatur natus nemo perspiciatis odit porro quisquam consectetur!",rating:4},{id:3,name:"Apple watch 3",model:"Series 5 SE",price:529,imgSrc:"./img/products/apple-watch.png",shortDesc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, ratione?",mainDesc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi temporibus magnam dolorem nobis repellendus alias ab aspernatur error illum dolores.",fullDesc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat eius repellendus, omnis dolorum dolor et est natus quae tempora quidem labore sequi possimus quia ex odit cupiditate, excepturi provident reiciendis exercitationem eos. Quidem sunt quibusdam eius, qui autem soluta magni deserunt corrupti fugit velit architecto nam et magnam ut, officia nemo labore voluptatibus est consequatur quaerat tempore placeat, provident veritatis! Debitis aspernatur voluptatibus sapiente sed nisi dolorum eius enim at officia similique ipsa, laboriosam pariatur aliquam eum dolore corporis quas temporibus, deserunt fugit non atque, necessitatibus illo. Cum laborum sed ullam, ab consequatur natus nemo perspiciatis odit porro quisquam consectetur!",rating:4}],this.bag=[{id:1,amount:2},{id:2,amount:1}]}getItems(){return this.itemsMock}getBagItems(){return this.bag}}const d="data-item-id",I="noProduct",_="emptyBag",B="js-items-add-to-bag",v="goBackToItemsBtn",f='"addToBagFromItemcard"';class E{constructor(){m(this,"_handleOpenSelectedItem",e=>{const t=e.target,i=t.closest("li");if(i==null)return;const s=i.getAttribute(d),a=this.model.getItemById(s);if(!a){this._showEror(I);return}t.classList.contains(B)?this._handleAddItemToBag(a):(this._openNextPage(i),this.view.renderItemCard(a),this._listenGoPreviousPage(v),this._listenAddToBag(f))});m(this,"_handleOpenBag",()=>{if(this.model.getBagItems().length==0){this._showEror(_);return}const e=document.getElementById("itemsList"),t=document.getElementById("itemCard");document.getElementById("bag").classList.add("visible"),t.classList.remove("visible"),e.classList.remove("visible")});this.view=new u({userClickedItem:this._handleOpenSelectedItem,userGoToBag:this._handleOpenBag}),this.model=new h,this.api=new b}init(){this.model.setItems(this.api.getItems()),this.view.renderItems(this.model.getItems()),this.model.setBagItems(this.api.getBagItems()),this.view.renderPreviewBag(this.model.getBagItems())}_handleAddItemToBag(e){this.model.addItemToBag(e),this.view.renderPreviewBag(this.model.getBagItems())}_openNextPage(e){const t=e.parentElement,i=t.nextElementSibling;this.view.changeVisibilityPages(t,i)}_handlerOpenPreviousPage(e){const t=e.parentElement,i=t.previousElementSibling;this.view.changeVisibilityPages(t,i)}_listenGoPreviousPage(e){const t=document.getElementById(e);t.addEventListener("click",()=>this._handlerOpenPreviousPage(t))}_listenAddToBag(e){const t=document.getElementById(e),i=t.getAttribute(d);t.addEventListener("click",()=>{this._handleAddItemToBag(this.model.getItemById(i))})}_showEror(e){const t=this.model.getTextByError(e);this.view.renderError(t)}}const y=new E;y.init();
