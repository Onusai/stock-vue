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


const monthEnum = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
const parseDate = text => {
    // text format: Mar-31-21 08:00AM

    let month = monthEnum.indexOf(text.substring(0, 3).toLowerCase()) + 1;
    let day = parseInt(text.substring(4, 6)) ;
    let year = parseInt("20"+text.substring(7, 9));
    let hour = parseInt(text.substring(10, 12));
    let minute = parseInt(text.substring(13, 15));
    let mer = text.substring(15, 17).toLowerCase();
    if (mer == 'pm' && hour != 12) {
        hour += 12;
    }

    let date = new Date(`${month} ${day} ${year} ${hour}:${minute}:00 GMT-4`);

    return date;
}


const getQuoteMarketWatch = async sym => {
    const url = `https://www.marketwatch.com/investing/stock/${sym}`;
    const html = await fetchHtml(url);
    let selector = cheerio.load(html);

    if (html.indexOf('symbollookup') > -1) {
        console.log(`-invalid sym: ${sym}`);
        return null;
    }

    const price = parseFloat(
        selector("body")
        .find(".intraday__price > .value")
        .text()
    );
    
    let relVol = parseFloat(
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
    
    if (!("Average Volume" in descData)) {
        descData["Average Volume"] = "";
    }
    const avgVol = {
        short: descData["Average Volume"],
        real: parseNum(descData["Average Volume"])
    };

    if (html.indexOf(`class="intraday__volume"`) != -1) {
        //let label = selector("body").find(".intraday__volume > .volume__label").text().trim();

        let iVol = selector("body").find(".intraday__volume > .volume__value").text().trim();
        let iVolReal = parseNum(iVol);
        relVol = iVolReal / avgVol.real;
    }


    if (!("Public Float" in descData)) {
        descData["Public Float"] = "";
    }
    const float = {
        short: descData["Public Float"],
        real: parseNum(descData["Public Float"])
    }

    const fpShorted = parseFloat(descData["% of Float Shorted"]);

    const chgp = parseFloat(
        selector("body")
        .find(".change--percent--q")
        .text()
    );
    
    return {sym, price, float, avgVol, relVol, fpShorted, url, chgp};
}


const getNewsMarketWatch = async sym => {
    const url = `https://www.marketwatch.com/investing/stock/${sym}`;
    const html = await fetchHtml(`${url}/moreheadlines?channel=PressReleases`);
    if (html == undefined) return [];
    let selector = cheerio.load(html);

    let news = [];

    const n = selector("body")
        .find(`.article__content`).each((i, el) => {
            let headline = selector(el).find(".link").text().trim();
            let link = selector(el).find(".link").attr('href');
            let timestamp = new Date(selector(el).find(".article__timestamp").attr("data-est")+"-04:00");
            news.push({headline, link, timestamp});
        });
    
    news.pop();

    return news;
}


const getNewsFinviz = async sym => {
    const url = `https://finviz.com/quote.ashx?t=${sym}`;
    const html = await fetchHtml(url);
    if (html == undefined) return [];
    let selector = cheerio.load(html);

    let news = [];
    let ndate = null;

    const n = selector("body")
        .find(`#news-table > tbody > tr`).each((i, el) => {
            
            let headline = selector(el).find(".tab-link-news").text().trim();
            let link = selector(el).find(".tab-link-news").attr('href');
            
            let timestamp = selector(el.firstChild).text().trim();
            if (timestamp.indexOf(" ") > -1) {
                ndate = timestamp.substring(0, timestamp.indexOf(" "));
            } else {
                timestamp = `${ndate} ${timestamp}`;
            }
            timestamp = parseDate(timestamp);
            
            news.push({headline, link, timestamp});
        });

    return news;
}


router.get('/:sym', (req, res) => {
    getQuoteMarketWatch(req.params.sym)
    .then(data => {
        
        if (!data) return res.sendStatus(404);

        getNewsFinviz(req.params.sym)
        .then(newsFV => {
            data.newsFV = newsFV;

            getNewsMarketWatch(req.params.sym)
            .then(newsMW => {
                data.newsMW = newsMW;

                res.json(data);
                console.log(`-$ ${req.params.sym.toUpperCase()}`)
            });
            
        });
    });
});


module.exports = router;