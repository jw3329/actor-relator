const axios = require('axios');
const cheerio = require('cheerio');

const Movie = require('../../node/movie');

const gatherActorInfo = async (actor, movieTitle) => {
    try {
        const url = actor.link;
        const html = (await axios.get(url)).data;
        const $ = cheerio.load(html);
        const infobox = $('.infobox.biography.vcard');
        const tr = $(infobox).contents().children('tr');
        const imageUrl = 'https:' + $(tr).find('.image').find('img').attr('src');
        const bday = $(tr).find('.bday').text();
        const occupation = $(tr).find('.role').text().trim().split(", ");
        const allegiance = $(tr).find('.flagicon').first().parent().text().trim();
        const table = $('.div-col.columns.column-width').length === 0 ? true : false;
        const filmList = table ? $('#Filmography').parent().nextAll('table').eq(0) : $('.div-col.columns.column-width');
        const movies = [];
        const wikiUrl = 'https://en.wikipedia.org';
        if (table) {
            const trs = $(filmList).find('tbody').find('tr').next();
            trs.each((_, tr) => {
                const td = $(tr).find('td').eq(1);
                const a = $(td).find('a');
                const url = $(a).attr('href');
                const title = $(a).text().trim();
                !movieTitle || movieTitle !== title && url && movies.push(
                    new Movie(wikiUrl + url, title)
                );
            });
        } else {
            const li = $(filmList).find('ul').children('li');
            li.each((_, elem) => {
                const a = $(elem).find('a');
                const url = $(a).attr('href');
                const title = $(a).text().trim();
                if (!(movieTitle && movieTitle === title))
                    url && movies.push(
                        new Movie(wikiUrl + url, title)
                    );
            });
        }
        actor.imageUrl = imageUrl;
        actor.bday = bday;
        actor.occupation = occupation;
        actor.allegiance = allegiance;
        actor.movies = movies;
    } catch (error) {
        console.log(error);
    }
}

module.exports = gatherActorInfo;