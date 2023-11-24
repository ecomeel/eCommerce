import { v4 as uuidv4 } from "uuid";

import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    doc,
    getDocs,
    setDoc,
    updateDoc,
    deleteDoc,
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
        const querySnapshot = await getDocs(collection(this.db, "products"));
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
    }

    // Bag
    async getBagFromDatabase() {
        const querySnapshot = await getDocs(collection(this.db, "bag"));
        const bag = [];
        querySnapshot.forEach((doc) => {
            bag.push({
                id: doc.id,
                name: doc.data().name,
                model: doc.data().model,
                amount: doc.data().amount,
                rating: doc.data().rating,
                price: doc.data().price,
                imgSrc: doc.data().imgSrc,
                shortDesc: doc.data().shortDesc,
                mainDesc: doc.data().mainDesc,
                fullDesc: doc.data().fullDesc,
            });
        });
        return bag;
    }

    async setItemBag(item) {
        await setDoc(doc(this.db, "bag", item.id), {
            name: item.name,
            model: item.model,
            amount: item.amount,
            price: item.price,
            imgSrc: item.imgSrc,
            shortDesc: item.shortDesc,
            mainDesc: item.mainDesc,
            fullDesc: item.fullDesc,
        });
    }

    async updateAmountItemBag(id, amount) {
        const itemBagRef = doc(this.db, "bag", id);

        await updateDoc(itemBagRef, {
            amount: amount,
        });
    }

    async deleteItemFromBag(id) {
        const itemBagRef = doc(this.db, "bag", id);

        await deleteDoc(itemBagRef);
    }

    async clearBag() {
        const querySnapshot = await getDocs(collection(this.db, "bag"));
        const bagIds = [];
        querySnapshot.forEach((doc) => {
            bagIds.push(doc.id)
        });

        bagIds.forEach(id => {
            this.deleteItemFromBag(id)
        });
    }

    //Orders
    async getOrdersFromDatabase() {
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

