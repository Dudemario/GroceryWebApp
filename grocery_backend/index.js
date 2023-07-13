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
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", 
    userDataDir: "/Users/vincent/Library/Application Support/Google/Chrome/Profile 1"
  });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto(
    "https://www.walmart.ca/search?q=banana&c=10019"
  );
  //await page.setGeolocation({ latitude: 43.4669, longitude: -79.6858 });
  const productsHandles = await page.$$(
    "div.css-qsotkn.e5icx9n1"// > .css-1d0izcz.e1m8uw9118
  );

  //loop through all products
  for (const producthandle of productsHandles) {
    let title = "Null";
    let price = "Null";
    let img = "Null";

    try {
      //get title of single product
      title = await page.evaluate(
        (el) => el.querySelector("div > span > div > p").textContent,
        producthandle
      );
    } catch (error) { }

    try {
      //get price of single product
      price = await page.evaluate(
        (el) => el.querySelector("div > span > div > p").textContent,
        producthandle
      );
    } catch (error) { }

    try {
      //get img of single product
      img = await page.evaluate(
        (el) => el.querySelector("div > span > div > p").textContent,
        producthandle
        //(el) => el.querySelector(".s-image").getAttribute("src"),
        //producthandle
      );
    } catch (error) { }

    //put product into list
    if (title !== "Null") {
      fs.appendFile(
        "products.csv",
        `${title.replace(/,/g, ".")},${price},${img}\n`,
        function (err) {
          if (err) throw err;
        }
      );
    }
  }

  await browser.close();
})();