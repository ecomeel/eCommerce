var p=Object.defineProperty;var h=(r,e,t)=>e in r?p(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var o=(r,e,t)=>(h(r,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();const m="visible";class b{constructor({userClickedItem:e,userGoToBag:t,changeAmountItems:i}){this.itemsListNode=document.getElementById("itemsList"),this.itemCardNode=document.getElementById("itemCard"),this.previewBagItemsNode=document.getElementById("previewBagItems"),this.goToBagBtnNode=document.getElementById("goToBagBtn"),this.itemsListNode.addEventListener("click",e),this.goToBagBtnNode.addEventListener("click",t)}renderItems(e){let t="";e.forEach(i=>{t+=`
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
                </li>`}),this.previewBagItemsNode.innerHTML=t}renderPricePreview(e){document.getElementById("previewOrderCost").innerText=`Сумма: $ ${e}`}renderPreviewTakeOrder(e,t,i){document.getElementById("previewTakeOrderCost").innerText=`$ ${e}`,document.getElementById("previewTakeOrderDeliveryCost").innerText=`$ ${t}`,document.getElementById("previewTakeOrderFinalCost").innerText=`$ ${i}`}renderItemCard(e){let t=`
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
                            </div>`;this.itemCardNode.innerHTML=t}renderBag(e){const t=document.getElementById("bagItemsList");let i="";e.forEach(s=>{i+=`
                <li data-item-id=${s.id} class="bag__item bag-item">
                <img
                    class="bag-item__img"
                    src=${s.imgSrc}
                    alt=${s.name}
                />
                <div class="bag-item__text">
                    <h3 class="bag-item__name">
                        ${s.name}
                    </h3>
                    <p class="bag-item__model">
                        ${s.model}
                    </p>
                    <p class="bag-item__description">
                        ${s.shortDesc}
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
                        <p class="rating__value">${s.rating} / 5</p>
                    </div>
                    <div class="bag__cost">
                        <p class="bag__price">
                            $ ${s.price} x ${s.amount}
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
                                ${s.amount}
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
            </li>`}),t.innerHTML=i}renderTakeOrderItemsList(e){const t=document.getElementById("takeOrderItemsList");let i="";e.forEach(s=>{i+=`
            <li class="bag__item bag-item">
                <img
                    class="bag-item__img"
                    src=${s.imgSrc}
                    alt=${s.name}
                />
                <div class="bag-item__text">
                    <h3 class="bag-item__name">
                        ${s.name}
                    </h3>
                    <p class="bag-item__model">
                        ${s.shortDesc}
                    </p>
                    <p class="bag-item__description">
                        ${s.shortDesc}
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
                            ${s.rating} / 5
                        </p>
                    </div>
                    <div class="bag__cost">
                        <p class="bag__price">
                            $ ${s.price} x ${s.amount}
                        </p>
                    </div>
                </div>
            </li>
            `}),t.innerHTML=i}renderAddress(e){console.log(e),document.getElementById("addressName").innerText=e.name,document.getElementById("addressStreet").innerText=e.street,document.getElementById("addressCity").innerText=e.city,document.getElementById("addressPhone").innerText=e.phone}renderPaytype(e,t){document.getElementById("selectedPaytype").innerHTML=`
            <img
                class="pay-type__result-img"
                src="img/buttons/${t}-pay.png"
                alt="card"
            />
            <p>${e}</p>
        `}renderError(e){const t=document.getElementById("errorPage");t.classList.add(m);const i=document.getElementById("errorTitle");i.innerText=e,document.getElementById("closeErrorPageBtn").addEventListener("click",()=>{t.classList.remove(m)})}changeVisibilityPages(e,t){e.classList.remove(m),t.classList.add(m)}changeVisibilityPopup(e){e.classList.toggle("visible"),document.body.classList.toggle("fixe-scroll")}}function v(r){const e=[];let t={};return r.forEach(i=>{e.push(i.id),t={...t,[i.id]:i}}),[e,t]}class y{constructor(){this.itemsIDs=[],this.itemById={},this.bagItemsIds=[],this.bag=[],this.orderCost=0,this.deliveryCost=10,this.address={},this.paytypes={card:"Оплата картой при получении",cash:"Оплата наличными при получении"},this.selectedPaytype="card",this.newOrderId=1,this.orders=[],this.errors={noProduct:"Упс, ошибка. Такого товара нет.",emptyBag:"Корзина пуста",emptyOrder:"В заказе не товаров",notFoundOrder:"Страница не найдена"}}setItems(e){[this.itemsIDs,this.itemById]=v(e)}getItems(){const e=[];return this.itemsIDs.forEach(t=>{e.push(this.getItemById(t))}),e}getItemsIDs(){return this.itemsIDs}getItemById(e){return this.itemById[e]}setBag(e){this.bag=e,this.bag.forEach(t=>{this.bagItemsIds.push(t.id)}),this._onBagChanges()}getBag(){return this.bag}addItemToBag(e){const t=this.getItemById(e);this.bagItemsIds.includes(e)?this.incrementItemToBag(e):(this.bagItemsIds.push(e),this.bag.push({...t,amount:1})),this._onBagChanges()}incrementItemToBag(e){this.bag.forEach(t=>{t.id==e&&(t.amount=t.amount+1)})}decrementItemToBag(e){let t=!1;if(this.bag.forEach(i=>{i.id==e&&(i.amount-=1,i.amount<1&&(t=!0))}),t){t=!1;const i=this.bagItemsIds.indexOf(e);this.bag=this.bag.filter(s=>s.id!=e),this.bagItemsIds.splice(i)}this._onBagChanges()}_onBagChanges(){this.orderCost=0,this.bag.forEach(e=>{this.orderCost+=e.price*e.amount}),console.log("bag: ",this.bag),console.log(this.orderCost)}getOrderCost(){return this.orderCost}getDeliveryCost(){return this.deliveryCost}getFinalCost(){return this.deliveryCost+this.orderCost}takeOrder(){this.newOrderId,this.bag,this.getFinalCost(),this.selectedPaytype,this.address,this.orders.push(this.newOrder),this.newOrderId+=1}setOrders(e){this.orders=e}getOrders(){return this.orders}setAddress(e){this.address={...e}}getAddress(){return this.address}setPaytype(e){this.selectedPaytype=e}getPayTypeMessage(){return this.paytypes[this.selectedPaytype]}getTextByError(e){return this.errors[e]}}class B{constructor(){this.itemsMock=[{id:1,name:"Apple watch",model:"Series 5 SE",price:529,imgSrc:"./img/products/apple-watch.png",shortDesc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, ratione?",mainDesc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi temporibus magnam dolorem nobis repellendus alias ab aspernatur error illum dolores.",fullDesc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat eius repellendus, omnis dolorum dolor et est natus quae tempora quidem labore sequi possimus quia ex odit cupiditate, excepturi provident reiciendis exercitationem eos. Quidem sunt quibusdam eius, qui autem soluta magni deserunt corrupti fugit velit architecto nam et magnam ut, officia nemo labore voluptatibus est consequatur quaerat tempore placeat, provident veritatis! Debitis aspernatur voluptatibus sapiente sed nisi dolorum eius enim at officia similique ipsa, laboriosam pariatur aliquam eum dolore corporis quas temporibus, deserunt fugit non atque, necessitatibus illo. Cum laborum sed ullam, ab consequatur natus nemo perspiciatis odit porro quisquam consectetur!",rating:4},{id:2,name:"Apple watch 2",model:"Series 5 SE",price:529,imgSrc:"./img/products/apple-watch.png",shortDesc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, ratione?",mainDesc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi temporibus magnam dolorem nobis repellendus alias ab aspernatur error illum dolores.",fullDesc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat eius repellendus, omnis dolorum dolor et est natus quae tempora quidem labore sequi possimus quia ex odit cupiditate, excepturi provident reiciendis exercitationem eos. Quidem sunt quibusdam eius, qui autem soluta magni deserunt corrupti fugit velit architecto nam et magnam ut, officia nemo labore voluptatibus est consequatur quaerat tempore placeat, provident veritatis! Debitis aspernatur voluptatibus sapiente sed nisi dolorum eius enim at officia similique ipsa, laboriosam pariatur aliquam eum dolore corporis quas temporibus, deserunt fugit non atque, necessitatibus illo. Cum laborum sed ullam, ab consequatur natus nemo perspiciatis odit porro quisquam consectetur!",rating:4},{id:3,name:"Apple watch 3",model:"Series 5 SE",price:529,imgSrc:"./img/products/apple-watch.png",shortDesc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, ratione?",mainDesc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi temporibus magnam dolorem nobis repellendus alias ab aspernatur error illum dolores.",fullDesc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat eius repellendus, omnis dolorum dolor et est natus quae tempora quidem labore sequi possimus quia ex odit cupiditate, excepturi provident reiciendis exercitationem eos. Quidem sunt quibusdam eius, qui autem soluta magni deserunt corrupti fugit velit architecto nam et magnam ut, officia nemo labore voluptatibus est consequatur quaerat tempore placeat, provident veritatis! Debitis aspernatur voluptatibus sapiente sed nisi dolorum eius enim at officia similique ipsa, laboriosam pariatur aliquam eum dolore corporis quas temporibus, deserunt fugit non atque, necessitatibus illo. Cum laborum sed ullam, ab consequatur natus nemo perspiciatis odit porro quisquam consectetur!",rating:4}],this.bagMock=[{id:1,name:"Apple watch",model:"Series 5 SE",price:529,imgSrc:"./img/products/apple-watch.png",shortDesc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, ratione?",mainDesc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi temporibus magnam dolorem nobis repellendus alias ab aspernatur error illum dolores.",fullDesc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat eius repellendus, omnis dolorum dolor et est natus quae tempora quidem labore sequi possimus quia ex odit cupiditate, excepturi provident reiciendis exercitationem eos. Quidem sunt quibusdam eius, qui autem soluta magni deserunt corrupti fugit velit architecto nam et magnam ut, officia nemo labore voluptatibus est consequatur quaerat tempore placeat, provident veritatis! Debitis aspernatur voluptatibus sapiente sed nisi dolorum eius enim at officia similique ipsa, laboriosam pariatur aliquam eum dolore corporis quas temporibus, deserunt fugit non atque, necessitatibus illo. Cum laborum sed ullam, ab consequatur natus nemo perspiciatis odit porro quisquam consectetur!",rating:4,amount:2},{id:2,name:"Apple watch 2",model:"Series 5 SE",price:529,imgSrc:"./img/products/apple-watch.png",shortDesc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, ratione?",mainDesc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi temporibus magnam dolorem nobis repellendus alias ab aspernatur error illum dolores.",fullDesc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat eius repellendus, omnis dolorum dolor et est natus quae tempora quidem labore sequi possimus quia ex odit cupiditate, excepturi provident reiciendis exercitationem eos. Quidem sunt quibusdam eius, qui autem soluta magni deserunt corrupti fugit velit architecto nam et magnam ut, officia nemo labore voluptatibus est consequatur quaerat tempore placeat, provident veritatis! Debitis aspernatur voluptatibus sapiente sed nisi dolorum eius enim at officia similique ipsa, laboriosam pariatur aliquam eum dolore corporis quas temporibus, deserunt fugit non atque, necessitatibus illo. Cum laborum sed ullam, ab consequatur natus nemo perspiciatis odit porro quisquam consectetur!",rating:4,amount:1}],this.ordersMock=[{id:111,order:{id:1,name:"Apple watch",model:"Series 5 SE",price:529,imgSrc:"./img/products/apple-watch.png",shortDesc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, ratione?",mainDesc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi temporibus magnam dolorem nobis repellendus alias ab aspernatur error illum dolores.",fullDesc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat eius repellendus, omnis dolorum dolor et est natus quae tempora quidem labore sequi possimus quia ex odit cupiditate, excepturi provident reiciendis exercitationem eos. Quidem sunt quibusdam eius, qui autem soluta magni deserunt corrupti fugit velit architecto nam et magnam ut, officia nemo labore voluptatibus est consequatur quaerat tempore placeat, provident veritatis! Debitis aspernatur voluptatibus sapiente sed nisi dolorum eius enim at officia similique ipsa, laboriosam pariatur aliquam eum dolore corporis quas temporibus, deserunt fugit non atque, necessitatibus illo. Cum laborum sed ullam, ab consequatur natus nemo perspiciatis odit porro quisquam consectetur!",rating:4,amount:2},cost:1234,paytype:"cash",address:{name:"Вася Пупкин",street:"Московская 9",city:"Петрозаводск",phone:"+79999999999"}}]}getItems(){return this.itemsMock}getBagItems(){return this.bagMock}getOrders(){return this.ordersMock}}class _{constructor(){o(this,"_handleOpenSelectedItem",e=>{const t=e.target,i=t.closest("li");if(i==null)return;const s=i.getAttribute("data-item-id"),a=this.model.getItemById(s);if(!a){this._showEror("noProduct");return}if(t.classList.contains("js-items-add-to-bag"))this._handleAddItemToBag(s);else{const d=document.getElementById("previewItemsWrapper"),c=document.getElementById("itemCard");this.view.changeVisibilityPages(d,c),this.view.renderItemCard(a),document.getElementById("goBackToItemsBtn").addEventListener("click",()=>{this.view.changeVisibilityPages(c,d)});const l=document.getElementById("addToBagFromItemcard"),u=l.getAttribute("data-item-id");l.addEventListener("click",()=>{this._handleAddItemToBag(u)})}});o(this,"_handleOpenBag",()=>{if(this.model.getBag().length==0){this._showEror("emptyBag");return}const e=document.getElementById("previewItemsWrapper"),t=document.getElementById("itemCard"),i=document.getElementById("bag");t.classList.remove("visible"),this.view.changeVisibilityPages(e,i);const s=document.getElementById("previewGoBagBtn"),a=document.getElementById("previewBagPrice");this.view.changeVisibilityPages(s,a),this.view.renderPricePreview(this.model.getOrderCost()),this.view.renderBag(this.model.getBag()),document.getElementById("goBackFromBagBtn").addEventListener("click",()=>{this.view.changeVisibilityPages(i,e),this.view.changeVisibilityPages(a,s)}),document.getElementById("bagItemsList").addEventListener("click",this._handlerChangeAmountItem),document.getElementById("previewGoTakeOrderBtn").addEventListener("click",this._handerOpenTakeOrder)});o(this,"_handerOpenTakeOrder",()=>{if(this.model.getBag().length==0){this._showEror("emptyOrder");return}const e=document.getElementById("bag"),t=document.getElementById("takeOrder");this.view.changeVisibilityPages(e,t);const i=document.getElementById("previewBag"),s=document.getElementById("previewTakeOrder"),a=document.getElementById("previewBagPrice");this.view.changeVisibilityPages(i,s),a.classList.remove("visible");const n=this.model.getOrderCost(),d=this.model.getDeliveryCost(),c=this.model.getFinalCost();this.view.renderPreviewTakeOrder(n,d,c),this.view.renderTakeOrderItemsList(this.model.getBag()),document.getElementById("goBackFromTakeOrder").addEventListener("click",()=>{this.view.changeVisibilityPages(t,e),this.view.changeVisibilityPages(s,i),a.classList.add("visible")}),document.getElementById("changeAddressBtn").addEventListener("click",this._handlerChangeAddress),this.view.renderPaytype(this.model.getPayTypeMessage(),this.model.selectedPaytype),document.getElementById("changePaytypeBtn").addEventListener("click",this._handlerChangePaytype),document.getElementById("previewTakeOrderBtn").addEventListener("click",this._handlerTakeOrder)});o(this,"_handlerTakeOrder",()=>{this.model.takeOrder();const e=document.getElementById("takeOrder"),t=document.getElementById("createdOrder");this.view.changeVisibilityPages(e,t);const i=document.getElementById("previewTakeOrder"),s=document.getElementById("previewCreatedOrder");this.view.changeVisibilityPages(i,s)});o(this,"_handlerChangePaytype",()=>{const e=document.getElementById("paytypePopup");e.classList.add("visible"),document.body.classList.add("fixe-scroll"),document.getElementById("saveNewPaytype").addEventListener("click",()=>{this._handlerSavePaytype(e)})});o(this,"_handlerChangeAddress",()=>{const e=document.getElementById("addressPopup");e.classList.add("visible"),document.body.classList.add("fixe-scroll"),document.getElementById("saveNewAddressBtn").addEventListener("click",()=>{this._handlerSaveAddress(e)})});o(this,"_handlerSavePaytype",e=>{e.querySelectorAll(".pay-type-popup__real-radio").forEach(i=>{i.checked&&this.model.setPaytype(i.value)}),e.classList.remove("visible"),document.body.classList.remove("fixe-scroll"),this.view.renderPaytype(this.model.getPayTypeMessage(),this.model.selectedPaytype)});o(this,"_handlerSaveAddress",e=>{const t=document.getElementById("newAddressName").value,i=document.getElementById("newAddressStreet").value,s=document.getElementById("newAddressCity").value,a=document.getElementById("newAddressPhone").value;if(!t&&!i&&!s&&!a){alert("Заполните все поля");return}this.model.setAddress({name:t,street:i,city:s,phone:a}),e.classList.remove("visible"),document.body.classList.remove("fixe-scroll"),this.view.renderAddress(this.model.getAddress())});o(this,"_handlerChangeAmountItem",e=>{const t=e.target,i=e.target.closest("li"),s=e.target.closest("button"),a=i.getAttribute("data-item-id");if(t&&s){if(s.classList.contains("bag__change-amount_minus")){if(this.model.decrementItemToBag(a),this.view.renderPreviewBag(this.model.getBag()),this.model.getBag().length==0){document.getElementById("bag").classList.remove("visible"),document.getElementById("previewItemsWrapper").classList.add("visible"),this._showEror("emptyBag");const n=document.getElementById("previewGoBagBtn"),d=document.getElementById("previewBagPrice");this.view.changeVisibilityPages(d,n)}}else this._handleAddItemToBag(a);this.view.renderBag(this.model.getBag()),this.view.renderPricePreview(this.model.getOrderCost())}});this.view=new b({userClickedItem:this._handleOpenSelectedItem,userGoToBag:this._handleOpenBag}),this.model=new y,this.api=new B}init(){this.model.setItems(this.api.getItems()),this.view.renderItems(this.model.getItems()),this.model.setBag(this.api.getBagItems()),this.view.renderPreviewBag(this.model.getBag()),this.model.setOrders(this.api.getOrders())}_handleAddItemToBag(e){this.model.addItemToBag(Number(e)),this.view.renderPreviewBag(this.model.getBag())}_showEror(e){const t=this.model.getTextByError(e);this.view.renderError(t)}}const I=new _;I.init();
