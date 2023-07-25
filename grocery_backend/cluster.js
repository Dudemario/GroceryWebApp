const fs = require("fs");
const puppeteer = require('puppeteer-extra');

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { Cluster } = require('puppeteer-cluster');

puppeteer.use(StealthPlugin());

const urls = ["https://www.walmart.ca/search?q=banana&c=10019"];

(async () => {
  const cluster = await Cluster.launch({
    puppeteer,
    concurrency: Cluster.CONCURRENCY_PAGE,
    maxConcurrency: 100,
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
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await cluster.task(async ({ page, data: url }) => {
    await page.goto(url);
    const productsHandles = await page.$$(
      "div.css-qsotkn.e5icx9n1 > div > .css-1d0izcz.e1m8uw9118"
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
          (el) => el.querySelector("div > span > span").textContent,
          producthandle
        );
      } catch (error) { }
  
    try {
      //get img of single product
      img = await page.evaluate(
        (el) => el.querySelector(".css-19q6667.e175iya62").getAttribute("src"),
        producthandle
      );
    } catch (error) { }
  
    //put product into list
    if (title !== "Null" && !price.includes("for")) {
      if(price.includes("¢")){
        price = "$0." + price.slice(0, 2)
      }
      fs.appendFile(
        "products.csv",
        `${title.replace(/,/g, ".")},${price},${img}\n`,
        function (err) {
          if (err) throw err;
        }
      );
    }
  }
  });
  for (const url of urls) {
    await cluster.queue(url);
  }
  // await cluster.idle();
  // await cluster.close();
})();