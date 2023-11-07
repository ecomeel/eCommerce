export default function normalizedBag(bag) {
    const ids = [];
    let amountById = {};
    bag.forEach(item => {
        ids.push(item.id);
        amountById[item.id] = item.amount;
    });

    return [ids, amountById]
}