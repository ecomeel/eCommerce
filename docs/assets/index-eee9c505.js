var d=Object.defineProperty;var p=(t,e,i)=>e in t?d(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i;var c=(t,e,i)=>(p(t,typeof e!="symbol"?e+"":e,i),i);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const m of o.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&s(m)}).observe(document,{childList:!0,subtree:!0});function i(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(a){if(a.ep)return;a.ep=!0;const o=i(a);fetch(a.href,o)}})();class g{constructor({userClickedItem:e}){this.itemsListNode=document.getElementById("itemsList"),this.itemCardNode=document.getElementById("itemCard"),this.previewBagItemsNode=document.getElementById("previewBagItems"),this.itemsListNode.addEventListener("click",e)}renderItems(e){let i="";e.forEach(s=>{i+=`
            <li data-item-id="${s.id}" class="preview-item">
                <img
                    class="preview-item__img"
                    src=${s.imgSrc}
                />
                <h3 class="preview-item__name">${s.name}</h3>
                <p class="preview-item__model">${s.model}</p>
                <div class="to-bag-wrapper">
                    <p class="preview-item__price">${s.price}$</p>
                    <img
                        src="img/buttons/to-bag-mini.png"
                        alt=""
                        class="js-items-add-to-bag preview-item__to-bag-btn black-btn"
                    />
                </div>
            </li>`}),this.itemsListNode.innerHTML=i}renderPreviewBag(e){const i=`
        <li class="preview-bag__item">
            <img
                class="preview-bag__img"
                src="${e.imgSrc}"
                alt=""
            />
        </li>`;this.previewBagItemsNode.innerHTML+=i}renderItemCard(e){let i=`
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
                            </div>`;this.itemCardNode.innerHTML=i}renderChangePage(e,i){this._hidePage(e),this._showPage(i)}_hidePage(e){e.classList.add("deactivated")}_showPage(e){e.classList.add("activated")}}let n;const h=new Uint8Array(16);function b(){if(!n&&(n=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!n))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return n(h)}const r=[];for(let t=0;t<256;++t)r.push((t+256).toString(16).slice(1));function _(t,e=0){return r[t[e+0]]+r[t[e+1]]+r[t[e+2]]+r[t[e+3]]+"-"+r[t[e+4]]+r[t[e+5]]+"-"+r[t[e+6]]+r[t[e+7]]+"-"+r[t[e+8]]+r[t[e+9]]+"-"+r[t[e+10]]+r[t[e+11]]+r[t[e+12]]+r[t[e+13]]+r[t[e+14]]+r[t[e+15]]}const v=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),l={randomUUID:v};function u(t,e,i){if(l.randomUUID&&!e&&!t)return l.randomUUID();t=t||{};const s=t.random||(t.rng||b)();if(s[6]=s[6]&15|64,s[8]=s[8]&63|128,e){i=i||0;for(let a=0;a<16;++a)e[i+a]=s[a];return e}return _(s)}class I{constructor(){this.items=[],this.itemsIDs=[],this.bagNumItems={},this.bagItems=[]}setIDsList(){this.items.forEach(e=>{this.itemsIDs.push(e.id)})}setItemsList(e){this.items=e}getItems(){return this.items}getItemsIDs(){return this.itemsIDs}getItemById(e){let i;return this.items.forEach(s=>{s.id===e&&(i=s)}),i}addItemToBag(e){const i=e.id;this.bagNumItems[i]?this.bagNumItems[i]+=1:this.bagNumItems[i]=1}getBagNumItemsId(){return this.bagIds}getBagItems(){const e=[];for(item in this.bagIds)e.push(item);return e}}class q{constructor(){this.items=[{id:u(),name:"Apple watch",model:"Series 5 SE",price:529,imgSrc:"./img/products/apple-watch.png",shortDesc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, ratione?",mainDesc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi temporibus magnam dolorem nobis repellendus alias ab aspernatur error illum dolores.",fullDesc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat eius repellendus, omnis dolorum dolor et est natus quae tempora quidem labore sequi possimus quia ex odit cupiditate, excepturi provident reiciendis exercitationem eos. Quidem sunt quibusdam eius, qui autem soluta magni deserunt corrupti fugit velit architecto nam et magnam ut, officia nemo labore voluptatibus est consequatur quaerat tempore placeat, provident veritatis! Debitis aspernatur voluptatibus sapiente sed nisi dolorum eius enim at officia similique ipsa, laboriosam pariatur aliquam eum dolore corporis quas temporibus, deserunt fugit non atque, necessitatibus illo. Cum laborum sed ullam, ab consequatur natus nemo perspiciatis odit porro quisquam consectetur!",rating:4},{id:u(),name:"Apple watch",model:"Series 5 SE",price:529,imgSrc:"./img/products/apple-watch.png",shortDesc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, ratione?",mainDesc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi temporibus magnam dolorem nobis repellendus alias ab aspernatur error illum dolores.",fullDesc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat eius repellendus, omnis dolorum dolor et est natus quae tempora quidem labore sequi possimus quia ex odit cupiditate, excepturi provident reiciendis exercitationem eos. Quidem sunt quibusdam eius, qui autem soluta magni deserunt corrupti fugit velit architecto nam et magnam ut, officia nemo labore voluptatibus est consequatur quaerat tempore placeat, provident veritatis! Debitis aspernatur voluptatibus sapiente sed nisi dolorum eius enim at officia similique ipsa, laboriosam pariatur aliquam eum dolore corporis quas temporibus, deserunt fugit non atque, necessitatibus illo. Cum laborum sed ullam, ab consequatur natus nemo perspiciatis odit porro quisquam consectetur!",rating:4},{id:u(),name:"Apple watch",model:"Series 5 SE",price:529,imgSrc:"./img/products/apple-watch.png",shortDesc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, ratione?",mainDesc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi temporibus magnam dolorem nobis repellendus alias ab aspernatur error illum dolores.",fullDesc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat eius repellendus, omnis dolorum dolor et est natus quae tempora quidem labore sequi possimus quia ex odit cupiditate, excepturi provident reiciendis exercitationem eos. Quidem sunt quibusdam eius, qui autem soluta magni deserunt corrupti fugit velit architecto nam et magnam ut, officia nemo labore voluptatibus est consequatur quaerat tempore placeat, provident veritatis! Debitis aspernatur voluptatibus sapiente sed nisi dolorum eius enim at officia similique ipsa, laboriosam pariatur aliquam eum dolore corporis quas temporibus, deserunt fugit non atque, necessitatibus illo. Cum laborum sed ullam, ab consequatur natus nemo perspiciatis odit porro quisquam consectetur!",rating:4}]}getItems(){return this.items}getImg(){return imagePhone}}class w{constructor(){c(this,"_handleUserSelectItem",e=>{const i=e.target,s=i.closest("li");if(s==null)return;const a=s.getAttribute("data-item-id"),o=this.model.getItemById(a);i.classList.contains("js-items-add-to-bag")?this._handleAddItemToBag(o):this._showItemCard(s,o)});this.view=new g({userClickedItem:this._handleUserSelectItem}),this.model=new I,this.api=new q}init(){setTimeout(()=>{const e=this.api.getItems();this.model.setItemsList(e),this.model.setIDsList(),this.view.renderItems(this.model.getItems()),console.log(this.api.getImg()),console.log("Товары загружены и отрисованы")},1e3)}_handleAddItemToBag(e){this.model.addItemToBag(e),this.view.renderPreviewBag(e)}_showItemCard(e,i){const s=e.parentElement,a=s.nextElementSibling;this.view.renderChangePage(s,a),this.view.renderItemCard(i)}_handleChangeBag(e,i){console.log(e,i)}}const f=new w;f.init();
