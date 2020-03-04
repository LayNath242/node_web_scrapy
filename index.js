const request = require('request-promise');
const cheerio = require('cheerio');
const { parse } = require('json2csv');

const fs = require('fs');

const URL = [
    'https://www.imdb.com/title/tt2911666/?ref_=nv_sr_srsg_3',
    'https://www.imdb.com/title/tt4425200/?ref_=nv_sr_srsg_6',
    'https://www.imdb.com/title/tt6146586/?ref_=nv_sr_srsg_0'
];
(async () => {
    let movieData = [];
    for (let movie of URL) {
        const response = await request({
            uri: movie,
            headers: {
                Accept:
                    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'en-US,en;q=0.9,th;q=0.8',
                'Cache-Control': 'max-age=0',
                Connection: 'keep-alive',
                Host: 'www.imdb.com',
                'Upgrade-Insecure-Requests': '1',
                'User-Agent':
                    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) snap Chromium/80.0.3987.116 Chrome/80.0.3987.116 Safari/537.36'
            },
            gzip: true
        });

        let $ = cheerio.load(response);
        let title = $('div[class="title_wrapper"] > h1')
            .text()
            .trim();
        let rating = $('span[itemprop="ratingValue"]').text();
        let poster = $('div[class="poster"] > a > img').attr('src');
        let totalRating = $('div[class="imdbRating"] > a').text();
        let releaseDate = $('a[title="See more release dates"]')
            .text()
            .trim();

        let genres = [];
        $('div[class="title_wrapper"] > div[class="subtext"] a').each(
            (i, elm) => {
                let genre = $(elm).text();
                genres.push(genre);
            }
        );
        genres = genres.slice(0, -1);

        movieData.push({
            title,
            poster,
            rating,
            totalRating,
            releaseDate,
            genres
        });
    }
    fs.writeFileSync('./movie.json', JSON.stringify(movieData), 'utf-8');
    console.log(movieData);
    debugger;
})();
