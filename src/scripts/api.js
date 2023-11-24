import { v4 as uuidv4 } from "uuid";

import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    doc,
    getDocs,
    setDoc,
    updateDoc,
    deleteDoc
} from "firebase/firestore";

export default class Api {
    constructor() {
        this.ordersMock = [
            {
                id: 111,
                order: [
                    {
                        id: 1,
                        name: "Apple watch",
                        model: "Series 5 SE",
                        price: 529,
                        imgSrc: "./img/products/apple-watch.png",
                        shortDesc:
                            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, ratione?",
                        mainDesc:
                            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi temporibus magnam dolorem nobis repellendus alias ab aspernatur error illum dolores.",
                        fullDesc:
                            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat eius repellendus, omnis dolorum dolor et est natus quae tempora quidem labore sequi possimus quia ex odit cupiditate, excepturi provident reiciendis exercitationem eos. Quidem sunt quibusdam eius, qui autem soluta magni deserunt corrupti fugit velit architecto nam et magnam ut, officia nemo labore voluptatibus est consequatur quaerat tempore placeat, provident veritatis! Debitis aspernatur voluptatibus sapiente sed nisi dolorum eius enim at officia similique ipsa, laboriosam pariatur aliquam eum dolore corporis quas temporibus, deserunt fugit non atque, necessitatibus illo. Cum laborum sed ullam, ab consequatur natus nemo perspiciatis odit porro quisquam consectetur!",
                        rating: 4,
                        amount: 2,
                    },
                ],
                cost: 1234,
                paytype: "cash",
                address: {
                    name: "Вася Пупкин",
                    street: "Московская 9",
                    city: "Петрозаводск",
                    phone: "+79999999999",
                },
            },
        ];

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
        const itemBagRef = doc(this.db, 'bag', id);

        await updateDoc(itemBagRef, {
            amount: amount
        })
    }

    async deleteItemFromBag(id) {
        const itemBagRef = doc(this.db, 'bag', id);

        await deleteDoc(itemBagRef)
    }

    //Orders

    getBagItems() {
        return this.bagMock;
    }

    getOrders() {
        return this.ordersMock;
    }
}
