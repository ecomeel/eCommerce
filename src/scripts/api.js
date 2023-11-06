import { v4 as uuidv4 } from "uuid";


export default class Api {
    constructor() {
        this.items = [
            {
                id: uuidv4(),
                name: "Apple watch",
                model: "Series 5 SE",
                price: 529,
                imgSrc: "../../img/products/apple-watch.png",
                shortDesc:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, ratione?",
                mainDesc:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi temporibus magnam dolorem nobis repellendus alias ab aspernatur error illum dolores.",
                fullDesc:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat eius repellendus, omnis dolorum dolor et est natus quae tempora quidem labore sequi possimus quia ex odit cupiditate, excepturi provident reiciendis exercitationem eos. Quidem sunt quibusdam eius, qui autem soluta magni deserunt corrupti fugit velit architecto nam et magnam ut, officia nemo labore voluptatibus est consequatur quaerat tempore placeat, provident veritatis! Debitis aspernatur voluptatibus sapiente sed nisi dolorum eius enim at officia similique ipsa, laboriosam pariatur aliquam eum dolore corporis quas temporibus, deserunt fugit non atque, necessitatibus illo. Cum laborum sed ullam, ab consequatur natus nemo perspiciatis odit porro quisquam consectetur!",
                rating: 4,
            },
            {
                id: uuidv4(),
                name: "Apple watch",
                model: "Series 5 SE",
                price: 529,
                imgSrc: "../../img/products/apple-watch.png",
                shortDesc:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, ratione?",
                mainDesc:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi temporibus magnam dolorem nobis repellendus alias ab aspernatur error illum dolores.",
                fullDesc:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat eius repellendus, omnis dolorum dolor et est natus quae tempora quidem labore sequi possimus quia ex odit cupiditate, excepturi provident reiciendis exercitationem eos. Quidem sunt quibusdam eius, qui autem soluta magni deserunt corrupti fugit velit architecto nam et magnam ut, officia nemo labore voluptatibus est consequatur quaerat tempore placeat, provident veritatis! Debitis aspernatur voluptatibus sapiente sed nisi dolorum eius enim at officia similique ipsa, laboriosam pariatur aliquam eum dolore corporis quas temporibus, deserunt fugit non atque, necessitatibus illo. Cum laborum sed ullam, ab consequatur natus nemo perspiciatis odit porro quisquam consectetur!",
                rating: 4,
            },
            {
                id: uuidv4(),
                name: "Apple watch",
                model: "Series 5 SE",
                price: 529,
                imgSrc: "../../img/products/apple-watch.png",
                shortDesc:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, ratione?",
                mainDesc:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi temporibus magnam dolorem nobis repellendus alias ab aspernatur error illum dolores.",
                fullDesc:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat eius repellendus, omnis dolorum dolor et est natus quae tempora quidem labore sequi possimus quia ex odit cupiditate, excepturi provident reiciendis exercitationem eos. Quidem sunt quibusdam eius, qui autem soluta magni deserunt corrupti fugit velit architecto nam et magnam ut, officia nemo labore voluptatibus est consequatur quaerat tempore placeat, provident veritatis! Debitis aspernatur voluptatibus sapiente sed nisi dolorum eius enim at officia similique ipsa, laboriosam pariatur aliquam eum dolore corporis quas temporibus, deserunt fugit non atque, necessitatibus illo. Cum laborum sed ullam, ab consequatur natus nemo perspiciatis odit porro quisquam consectetur!",
                rating: 4,
            },
        ];
    }

    getItems() {
        return  this.items
    }
}