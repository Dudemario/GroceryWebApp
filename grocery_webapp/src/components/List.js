const ShopList = []; //list

const addToList = (name, price, store, distance, img) => {
    price = parseFloat(price.substring(1));
    ShopList.push({ name, price, store, distance, img });
};

export { ShopList, addToList };