const request = require('request-promise');
const cheerio = require('cheerio');

const URL = 'https://www.imdb.com/title/tt0102926/';

(async () => {
    const response = await request({
        uri: URL,
        headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'en-US,en;q=0.9,th;q=0.8',
                'Cache-Control': 'max-age=0',
                'Connection': 'keep-alive',
                'Host': 'www.imdb.com',
                'Referer': 'https://www.imdb.com/title/tt0102926/',
                'Sec-Fetch-Dest': 'iframe',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'cross-site',
                'Upgrade-Insecure-Requests': '1',
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) snap Chromium/80.0.3987.116 Chrome/80.0.3987.116 Safari/537.36'
        }
    });

    let $ = cheerio.load(response);
    let title = $('div[class="title_wrapper"] > h1').text();
    let rating = $('span[itemprop="ratingValue"]').text();
    console.log(title);
    console.log(rating);
})();
