const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: "./tmp",
  });

  const page = await browser.newPage();
  await page.goto(
    "https://www.amazon.com/s?rh=n%3A16225007011&fs=true&ref=lp_16225007011_sar"
  );

  const productsHandles = await page.$$(
    "div.s-main-slot.s-result-list.s-search-results.sg-row > .s-result-item"
  );

  let items = [];

  //loop through all products
  for (const producthandle of productsHandles) {
    let title = "Null";
    let price = "Null";
    let img = "Null";

    try {
        //get title of single product
        title = await page.evaluate(
        (el) => el.querySelector("h2 > a > span").textContent,
        producthandle
      );
    } catch (error) {}

    try {
        //get price of single product
        price = await page.evaluate(
        (el) => el.querySelector(".a-price > .a-offscreen").textContent,
        producthandle
      );
    } catch (error) {}

    try {
        //get img of single product
        img = await page.evaluate(
        (el) => el.querySelector(".s-image").getAttribute("src"),
        producthandle
      );
    } catch (error) {}

    //put product into list
    if (title !== "Null") {
      items.push({ title, price, img });
    }
  }

  console.log(items);

  //await browser.close();
})();