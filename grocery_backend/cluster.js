const { Cluster } = require('puppeteer-cluster');

const urls = [];

(async () => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_PAGE,
    maxConcurrency: 100,
    puppeteerOptions: {
        headless: false,
        defaultViewport: false,
        userDataDir: "./tmp",
    }
  });

  await cluster.task(async ({ page, data: url }) => {
    await page.goto(url);
  });
  for (const url of urls) {
    await cluster.queue(url);
  }
  // many more pages

  await cluster.idle();
  await cluster.close();
})();