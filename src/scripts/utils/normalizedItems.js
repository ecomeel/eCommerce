export default function normalizedItems(items) {
    const ids = [];
    let byIds = {};
    items.forEach(item => {
        ids.push(item.id);
        byIds = {
            ...byIds,
            [item.id]: item
        }
    });

    return [ids, byIds]
}