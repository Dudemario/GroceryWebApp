const ShopList = []; //list

const addToList = (title, price, store, distance, img) => {
    ShopList.push({ title, price, store, distance, img });
};

export { ShopList, addToList };