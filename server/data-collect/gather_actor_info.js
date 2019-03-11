const axios = require('axios');
const cheerio = require('cheerio');

const Movie = require('../node/movie');

const gatherActorInfo = async actor => {
    try {
        const url = actor.link;
        const html = (await axios.get(url)).data;
        const $ = cheerio.load(html);
        const infobox = $('.infobox.biography.vcard');
        const tr = $(infobox).contents().children('tr');
        const name = $(tr).find('.fn').text();
        const imageUrl = 'https:' + $(tr).find('.image').find('img').attr('src');
        const bday = $(tr).find('.bday').text();
        const occupation = $(tr).find('.role').text();
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
                url && movies.push(
                    new Movie(wikiUrl + url)
                );
            });
        } else {
            const li = $(filmList).find('ul').children('li');
            li.each((_, elem) => {
                // console.log(elem);
                const a = $(elem).find('a');
                const url = $(a).attr('href');
                url && movies.push(
                    new Movie(wikiUrl + url)
                );
            });
        }
        actor.name = name;
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