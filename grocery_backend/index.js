const fs = require("fs");
const puppeteer = require('puppeteer-extra');

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: "./tmp",
    //executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    //userDataDir: "/Users/vincent/Library/Application Support/Google/Chrome/Profile 2"
  });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto(
    "https://www.nofrills.ca/search?search-bar=banana"
  );
  await page.waitForSelector('h3');
  const productsHandles = await page.$$(
    "ul.product-tile-group__list.product-tile-group__list--total-48 > li.product-tile-group__list__item"
  );

  //loop through all products
  for (const producthandle of productsHandles) {
    console.log("hi");
    let title = "Null";
    let price = "Null";
    let img = "Null";
    let url = "Null";

    try {
      //get title of single product
      title = await page.evaluate(
        (el) => el.querySelector("span.product-name__item.product-name__item--name").textContent,
        producthandle
      );
    } catch (error) {throw error}

    try {
      //get price of single product
      price = await page.evaluate(
        (el) => el.querySelector("span.price__value.selling-price-list__item__price.selling-price-list__item__price--now-price__value").textContent,
        producthandle
      );
    } catch (error) { }

  try {
    //get img of single product
    img = await page.evaluate(
      (el) => el.querySelector("div.product-tile__thumbnail__image > img").getAttribute("src"),
      producthandle
    );
  
  } catch (error) {}
  try {
    //get img of single product
    url = await page.evaluate(
      (el) => el.querySelector("h3 > a").getAttribute("href"),
      producthandle
    );

  } catch (error) { }
  //put product into list
  if (title !== "Null" && !price.includes("for")  && !price.includes("/")) {
    if(price.includes("¢")){
      price = "$0." + price.slice(0, 2)
    }
    fs.appendFile(
      "products.csv",
      `${title.replace(/,/g, ".")},${price},${img},www.metro.ca${url}\n`,
      function (err) {
        if (err) throw err;
      }
    );
  }
}

  await browser.close();
}) ();