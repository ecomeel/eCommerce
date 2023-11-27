export default class LocalStorage {
    constructor() {}

    getBagFromStorage() {
        return JSON.parse(localStorage.getItem('bag'));
    }

    setBagToStorage(bag) {
        localStorage.setItem('bag', JSON.stringify(bag))
    }

    getUserIdFromStorage() {
        return localStorage.getItem('userId')
    }

    setUserIdToStorage(id) {
        localStorage.setItem('userId', id)
    }

}