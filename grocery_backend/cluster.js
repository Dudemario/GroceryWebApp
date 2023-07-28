const fs = require("fs");
const puppeteer = require('puppeteer-extra');

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { Cluster } = require('puppeteer-cluster');

puppeteer.use(StealthPlugin());

const stores = {"walmart":["https://www.walmart.ca/search?q=banana&c=10019", "div.css-qsotkn.e5icx9n1 > div > .css-1d0izcz.e1m8uw9118", 
"div > span > div > p", "div > span > span", ".css-19q6667.e175iya62", ".css-mfluef.e1m8uw911"]};

(async () => {
  const cluster = await Cluster.launch({
    puppeteer,
    concurrency: Cluster.CONCURRENCY_PAGE,
    maxConcurrency: 100,
    timeout:100000,
    puppeteerOptions: {
      headless: false,
      defaultViewport: false,
      userDataDir: "./tmp",
      executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      userDataDir: "/Users/vincent/Library/Application Support/Google/Chrome/Profile 2"
    }
  });
  cluster.on("taskerror", (err, data) => {
    console.log(`Error crawling ${data}: ${err.message}`);
  });
  await cluster.task(async ({ page, data: url }) => {
    let storename = url.slice(12).split(".")[0];
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url);
    const productsHandles = await page.$$(
      stores[storename][1]
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
      } catch (error) {throw error}
  
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
    if (title !== "Null" && !price.includes("for")) {
      if(price.includes("¢")){
        price = "$0." + price.slice(0, 2);
      }
      if(producturl != "Null"){
        producturl = "https://" + url.split("/")[2] + producturl;
      }
      fs.appendFile(
        "products.csv",
        `${title.replace(/,/g, ".")},${price},${img},${producturl}\n`,
        function (err) {
          if (err) throw err;
        }
      );
    }
  }
  });
  for (const store in stores) {
    await cluster.queue(stores[store][0]);
  }
  await cluster.idle();
  await cluster.close();
})();