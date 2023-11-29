import { v4 as uuidv4 } from "uuid";

import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    doc,
    getDocs,
    setDoc,
} from "firebase/firestore";

export default class Api {
    constructor() {
        this.firebaseConfig = {
            apiKey: "AIzaSyA5qmjxOLa-eq6925FJsXHCtQdWcuj2TL0",
            authDomain: "ecommerce-d840d.firebaseapp.com",
            projectId: "ecommerce-d840d",
            storageBucket: "ecommerce-d840d.appspot.com",
            messagingSenderId: "159620922786",
            appId: "1:159620922786:web:6a0db00de0e1353a51c6fb",
        };
        this.app = initializeApp(this.firebaseConfig);
        this.db = getFirestore(this.app);
    }

    // Products
    async getProductsFromDatabase() {
        try {
            const querySnapshot = await getDocs(
                collection(this.db, "products")
            );
            const productsList = [];
            querySnapshot.forEach((doc) => {
                productsList.push({
                    id: doc.id,
                    name: doc.data().name,
                    model: doc.data().model,
                    price: doc.data().price,
                    rating: doc.data().rating,
                    imgSrc: doc.data().imgSrc,
                    shortDesc: doc.data().shortDesc,
                    mainDesc: doc.data().mainDesc,
                    fullDesc: doc.data().fullDesc,
                });
            });
            return productsList;
        } catch (e) {
            alert(
                "Ошибка загрузки списка продуктов, попробуйте обновить страницу"
            );
        }
    }

    //Orders
    async getOrdersFromDatabase() {
        try {
            const querySnapshot = await getDocs(collection(this.db, "orders"));
            const orders = [];
            querySnapshot.forEach((doc) => {
                orders.push({
                    id: Number(doc.id),
                    paytype: JSON.parse(doc.data().paytype),
                    cost: JSON.parse(doc.data().cost),
                    address: JSON.parse(doc.data().address),
                    order: JSON.parse(doc.data().order),
                });
            });
            return orders;
        } catch (error) {
            alert(
                "Ошибка загрузки списка заказов, попробуйте обновить страницу"
            );
        }
    }

    async setNewOrder(order) {
        await setDoc(doc(this.db, "orders", `${order.id}`), {
            paytype: JSON.stringify(order.paytype),
            cost: JSON.stringify(order.cost),
            address: JSON.stringify(order.address),
            order: JSON.stringify(order.order),
        });
    }
}
