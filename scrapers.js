const puppeteer = require('puppeteer');

async function scrapeProduct(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('//*[@id="ebooksImgBlkFront"]');
    const src = await el.getProperty('src');
    const srcTxt = await src.jsonValue();

    const [el2] = await page.$x('//*[@id="productTitle"]');
    const txt = await el2.getProperty('textContent');
    const title = await txt.jsonValue();
    console.log(txt, ' = txt');

    const [el3] = await page.$x('//*[@id="a-autoid-2-announce"]/span[2]/span[1]') ;
    const txt2 = await el3.getProperty('textContent');
    const price = await txt2.jsonValue();

    console.log({srcTxt, title, price});

    await  browser.close();
}


scrapeProduct('https://www.amazon.com/Black-Swan-Second-Improbable-Incerto-ebook/dp/B00139XTG4/ref=sr_1_2?crid=J8DRKMLOG6J5&keywords=black+swan&qid=1673367249&sprefix=black+swan%2Caps%2C67&sr=8-2');

