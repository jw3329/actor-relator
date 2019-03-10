const axios = require('axios');
const cheerio = require('cheerio');

const gatherActorInfo = async url => {
    try {
        const html = (await axios.get(url)).data;
        const $ = cheerio.load(html);
        const infobox = $('.infobox.biography.vcard');
        const tr = $(infobox).contents().children('tr');
        const name = $(tr).find('.fn').text();
        const bday = $(tr).find('.bday').text();
        const occupation = $(tr).find('.role').text();
        const allegiance = $(tr).find('.flagicon').first().parent().text().trim();
        const table = $('.div-col.columns.column-width').length === 0 ? true : false;
        const filmList = table ? $('#Filmography').parent().nextAll('table').eq(0) : $('.div-col.columns.column-width');
        const movie = [];
        const wikiUrl = 'https://en.wikipedia.org';
        if (table) {
            const trs = $(filmList).find('tbody').find('tr').next();
            console.log(trs.eq(0).html());
            trs.each((_, tr) => {
                const td = $(tr).find('td').eq(1);
                const a = $(td).find('a');
                const url = $(a).attr('href');
                const title = $(a).text();
                movie.push({
                    movieUrl: wikiUrl + url,
                    movieTitle: title
                });
            });
        } else {
            const li = $(filmList).find('ul').children('li');
            li.each((_, elem) => {
                // console.log(elem);
                const a = $(elem).find('a');
                const url = $(a).attr('href');
                const title = $(a).text();
                movie.push({
                    movieUrl: wikiUrl + url,
                    movieTitle: title
                });
            });
        }
        const actor = {
            name,
            bday,
            occupation,
            allegiance,
            movie
        }
        return actor
    } catch (error) {
        return error;
    }
}

const gatherMovieInfo = async () => {

}

module.exports = {
    gatherActorInfo,
    gatherMovieInfo
}