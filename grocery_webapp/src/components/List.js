let ShopList = []; //list
const stored = localStorage.getItem("shop_list");
if(stored) {
    ShopList = JSON.parse(stored);
}

const addToList = (name, price, store, distance, img) => {
    price = parseFloat(price.substring(1));
    ShopList.push({ name, price, store, distance, img });
};

export { ShopList, addToList };