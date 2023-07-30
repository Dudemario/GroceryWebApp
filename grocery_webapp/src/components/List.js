const ShopList = []; //list

const addToList = (name, price, store, distance, img) => {
    ShopList.push({ name, price, store, distance, img });
};

export { ShopList, addToList };