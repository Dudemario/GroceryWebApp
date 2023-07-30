const fs = require("fs");
const fsExtra = require("fs-extra");
const puppeteer = require('puppeteer-extra');
const express = require("express");

const PORT = process.env.PORT || 3000;
const app = express();
// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { Cluster } = require('puppeteer-cluster');

puppeteer.use(StealthPlugin());

const stores = {"walmart":["https://www.walmart.ca/search?q=", "div.css-qsotkn.e5icx9n1 > div > .css-1d0izcz.e1m8uw9118", 
"div > span > div > p", "div > span > span", ".css-19q6667.e175iya62", ".css-mfluef.e1m8uw911"], 
"metro":["https://www.metro.ca/en/online-grocery/search?filter=", "div.products-search--grid.searchOnlineResults > .default-product-tile.tile-product.item-addToCart",
"div.content__head > a > div", "div.content__pricing > div > div > span","a > picture > img", ".product-details-link"], "loblaws":["https://www.loblaws.ca/search?search-bar=", 
"ul.product-tile-group__list.product-tile-group__list--total-48 > li.product-tile-group__list__item", "span.product-name__item.product-name__item--name",
"span.price__value.selling-price-list__item__price.selling-price-list__item__price--now-price__value", "div.product-tile__thumbnail__image > img", 
"h3 > a"]};
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
app.post("/scrape", (req, res) => {
  scrape(req.body);
  //scrape(req.body);
});
async function scrape(object) {
  fsExtra.emptyDirSync("/Users/vincent/Documents/Projects/React/GroceryWebApp/grocery_webapp/src/website_search");
  const cluster = await Cluster.launch({
    puppeteer,
    concurrency: Cluster.CONCURRENCY_PAGE,
    maxConcurrency: 100,
    timeout:100000,
    puppeteerOptions: {
      headless: false,
      defaultViewport: false,
      userDataDir: "./tmp",
      //executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      //userDataDir: "/Users/vincent/Library/Application Support/Google/Chrome/Profile 2"
    }
  });
  cluster.on("taskerror", (err, data) => {
    console.log(`Error crawling ${data}: ${err.message}`);
  });
  await cluster.task(async ({ page, data: url }) => {
    let storename = url.slice(12).split(".")[0];
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url);
    if(storename == "loblaws"){
      await page.waitForSelector('h3');
      await page.evaluate(() => {
        window.scrollTo(0, window.document.body.scrollHeight/5);
      });
      await page.waitForTimeout(100);
      
    }
    const productsHandles = await page.$$(
      stores[storename][1]
    );
    fs.appendFile(
      `/Users/vincent/Documents/Projects/React/GroceryWebApp/grocery_webapp/src/website_search/${storename}.csv`,
      `title,price,img,url\n`,
      function (err) {
        if (err) throw err;
      }
    );
    //loop through all products
    for (const producthandle of productsHandles) {
      let title = "Null";
      let price = "Null";
      let img = "Null";
      let producturl = "Null";
  
      try {
        //get title of single product
        title = await page.evaluate(
          (path, el) => el.querySelector(path).textContent, stores[storename][2],
          producthandle
        );
      } catch (error) { }
  
      try {
        //get price of single product
        price = await page.evaluate(
          (path, el) => el.querySelector(path).textContent, stores[storename][3],
          producthandle
        );
      } catch (error) { }
  
      try {
        //get img of single product
        img = await page.evaluate(
          (path, el) => el.querySelector(path).getAttribute("src"), stores[storename][4],
          producthandle
        );
      } catch (error) { }
      try {
        //get img of single product
        producturl = await page.evaluate(
          (path, el) => el.querySelector(path).getAttribute("href"), stores[storename][5],
          producthandle
        );
    
      } catch (error) { }
    //put product into list
    if (title !== "Null" && !price.includes("for") && !price.includes("/") && img !== "Null") {
      if(price.includes("¢")){
        price = "$0." + price.slice(0, 2);
      }
      if(producturl !== "Null"){
        producturl = "https://" + url.split("/")[2] + producturl;
      }
      fs.appendFile(
        `/Users/vincent/Documents/Projects/React/GroceryWebApp/grocery_webapp/src/website_search/${storename}.csv`,
        `${title.replace(/,/g, ".")},${price},${img},${producturl}\n`,
        function (err) {
          if (err) throw err;
        }
      );
    }
  }
  });
  for (const store in stores) {
    let correcturl = stores[store][0];
    correcturl = correcturl.concat(`${object}`);
    if(store == "walmart"){
      correcturl = correcturl.concat("&c=10019");
    }
    await cluster.queue(correcturl);
  }
  await cluster.idle();
  await cluster.close();
};