import { v4 as uuidv4 } from "uuid";


export default class Api {
    constructor() {
        this.itemsMock = [
            {
                id: 1,
                name: "Apple watch",
                model: "Series 5 SE",
                price: 529,
                imgSrc: './img/products/apple-watch.png',
                shortDesc:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, ratione?",
                mainDesc:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi temporibus magnam dolorem nobis repellendus alias ab aspernatur error illum dolores.",
                fullDesc:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat eius repellendus, omnis dolorum dolor et est natus quae tempora quidem labore sequi possimus quia ex odit cupiditate, excepturi provident reiciendis exercitationem eos. Quidem sunt quibusdam eius, qui autem soluta magni deserunt corrupti fugit velit architecto nam et magnam ut, officia nemo labore voluptatibus est consequatur quaerat tempore placeat, provident veritatis! Debitis aspernatur voluptatibus sapiente sed nisi dolorum eius enim at officia similique ipsa, laboriosam pariatur aliquam eum dolore corporis quas temporibus, deserunt fugit non atque, necessitatibus illo. Cum laborum sed ullam, ab consequatur natus nemo perspiciatis odit porro quisquam consectetur!",
                rating: 4,
            },
            {
                id: 2,
                name: "Apple watch 2",
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
            },
            {
                id: 3,
                name: "Apple watch 3",
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
            }
        ];

        this.bagMock = [
            {
                id: 1,
                name: "Apple watch",
                model: "Series 5 SE",
                price: 529,
                imgSrc: './img/products/apple-watch.png',
                shortDesc:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, ratione?",
                mainDesc:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi temporibus magnam dolorem nobis repellendus alias ab aspernatur error illum dolores.",
                fullDesc:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat eius repellendus, omnis dolorum dolor et est natus quae tempora quidem labore sequi possimus quia ex odit cupiditate, excepturi provident reiciendis exercitationem eos. Quidem sunt quibusdam eius, qui autem soluta magni deserunt corrupti fugit velit architecto nam et magnam ut, officia nemo labore voluptatibus est consequatur quaerat tempore placeat, provident veritatis! Debitis aspernatur voluptatibus sapiente sed nisi dolorum eius enim at officia similique ipsa, laboriosam pariatur aliquam eum dolore corporis quas temporibus, deserunt fugit non atque, necessitatibus illo. Cum laborum sed ullam, ab consequatur natus nemo perspiciatis odit porro quisquam consectetur!",
                rating: 4,
                amount: 2
            },
            {
                id: 2,
                name: "Apple watch 2",
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
                amount: 1
            }
        ]

        this.ordersMock = [
            {
                id: 111,
                order: {
                    id: 1,
                    name: "Apple watch",
                    model: "Series 5 SE",
                    price: 529,
                    imgSrc: './img/products/apple-watch.png',
                    shortDesc:
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, ratione?",
                    mainDesc:
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi temporibus magnam dolorem nobis repellendus alias ab aspernatur error illum dolores.",
                    fullDesc:
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat eius repellendus, omnis dolorum dolor et est natus quae tempora quidem labore sequi possimus quia ex odit cupiditate, excepturi provident reiciendis exercitationem eos. Quidem sunt quibusdam eius, qui autem soluta magni deserunt corrupti fugit velit architecto nam et magnam ut, officia nemo labore voluptatibus est consequatur quaerat tempore placeat, provident veritatis! Debitis aspernatur voluptatibus sapiente sed nisi dolorum eius enim at officia similique ipsa, laboriosam pariatur aliquam eum dolore corporis quas temporibus, deserunt fugit non atque, necessitatibus illo. Cum laborum sed ullam, ab consequatur natus nemo perspiciatis odit porro quisquam consectetur!",
                    rating: 4,
                    amount: 2
                },
                cost: 1234,
                paytype: 'cash',
                address: {
                    name: 'Вася Пупкин',
                    street: 'Московская 9',
                    city: 'Петрозаводск',
                    phone: '+79999999999'
                }
            }
        ]
    }

    getItems() {
        return  this.itemsMock;
    }

    getBagItems() {
        return this.bagMock
    }

    getOrders() {
        return this.ordersMock
    }
}