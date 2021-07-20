const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const cheerio = require("cheerio");

const fetchHtml = async url => {
    try {
        const {data} = await axios.get(url);
        return data;
    } catch {
        console.error(
            `ERROR: An error occured while trying to fetch the URL: ${url}`
        );
    }
};

const parseNum = text => {
    switch(text.slice(-1)) {
        case "%":
            return parseFloat(text) / 100;
        case "K":
            return parseFloat(text) * 1000;
        case "M":
            return parseFloat(text) * 1000000;
        case "B":
            return parseFloat(text) * 1000000000;
        case "T":
            return parseFloat(text) * 1000000000000;
        default:
            return parseFloat(text);
    }
}

const scrapeMW = async sym => {
    const url = `https://www.marketwatch.com/investing/stock/${sym}`;
    const main_html = await fetchHtml(url);
    
    let selector = cheerio.load(main_html);

    const price = parseFloat(
        selector("body")
        .find(".intraday__price > .value")
        .text()
    );

    if (!price) {
        console.log(`-invalid: ${sym}`);
        return null;
    }
        

    const relVol = parseFloat(
        selector("body")
        .find(".range__bar").text().replace(",", "")
    ) / 100;
    
    let descData = {};
    const desc = selector("body")
        .find(".list--kv > li").each((i, el) => {
            const elSelector = selector(el);
            const label = elSelector.find(".label").text();
            const value = elSelector.find(".primary").text();
            descData[label] = value;
        });
    
    const avgVol = {
        short: descData["Average Volume"],
        real: parseNum(descData["Average Volume"])
    };

    const float = {
        short: descData["Public Float"],
        real: parseNum(descData["Public Float"])
    }

    const fpShorted = parseFloat(descData["% of Float Shorted"]);
    
    const news_html = await fetchHtml(`${url}/moreheadlines?channel=PressReleases`);
    selector = cheerio.load(news_html);

    let news = [];

    const n = selector("body")
        .find(`.article__content`).each((i, el) => {
            let headline = selector(el).find(".link").text().trim();
            let link = selector(el).find(".link").attr('href');
            let timestamp = new Date(selector(el).find(".article__timestamp").attr("data-est")+"-04:00");
            news.push({headline, link, timestamp});
        });
    
    news.pop();

    return {sym, price, float, avgVol, relVol, fpShorted, url, news};
}


router.get('/:sym', (req, res) => {
    scrapeMW(req.params.sym)
    .then(data => {
        
        if (!data) return res.sendStatus(404);
        
        res.json(data);
        console.log(`-$ ${req.params.sym.toUpperCase()}`)
        
    });
});


module.exports = router;