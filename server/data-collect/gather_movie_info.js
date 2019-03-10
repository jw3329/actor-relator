const axios = require('axios');
const cheerio = require('cheerio');

const Actor = require('../node/actor');

const getElemInTable = ($, tr, text) => {
    return $(tr).find('th').filter((_, elem) => $(elem).text().trim() === text.trim());
}

const gatherMovieInfo = async movie => {
    try {
        const url = movie.link;
        const wikiUrl = 'https://en.wikipedia.org';
        const html = (await axios.get(url)).data;
        const $ = cheerio.load(html);
        const infobox = $('.infobox');
        const tr = $(infobox).find('tr');
        // get all attributes to put into the movie object
        const title = $(tr).find('.summary').text().trim();
        const src = $(tr).find('.image').find('img').attr('src');
        const imageUrl = src ? 'https:' + $(tr).find('.image').find('img').attr('src').trim() : null;
        const director = getElemInTable($, tr, 'Directed by').next().text().trim();
        const producer = getElemInTable($, tr, 'Produced by').next().text().trim().split("\n");
        const starring = [];
        getElemInTable($, tr, 'Starring').next().find('li').each((_, li) => {
            starring.push(new Actor(wikiUrl + $(li).find('a').attr('href')));
        });
        const music = getElemInTable($, tr, 'Music by').next().text().trim();
        const cinematography = getElemInTable($, tr, 'Cinematography').next().text().trim();
        const editor = getElemInTable($, tr, 'Edited by').next().text().trim();
        const company = getElemInTable($, tr, 'Production<br>company').next().text().trim().split("\n");
        const distributed = getElemInTable($, tr, 'Distributed by').next().text().trim();
        const releaseDate = getElemInTable($, tr, 'Release date').next().find('li').eq(0).find('.bday').text().trim();
        let confirm = getElemInTable($, tr, 'Running time').next().text().trim().match(/^\d+/);
        const runningTime = confirm ? parseInt(getElemInTable($, tr, 'Running time').next().text().trim().match(/^\d+/)[0]) : null;
        const country = getElemInTable($, tr, 'Country').next().text().trim();
        const language = getElemInTable($, tr, 'Language').next().text().trim();
        confirm = getElemInTable($, tr, 'Budget').next().text().trim().match(/\d+/);
        const budget = confirm ? parseInt(confirm[0]) : null;
        confirm = getElemInTable($, tr, 'Box office').next().text().trim().match(/\d+/);
        const boxOffice = confirm ? parseInt(confirm[0]) : null;

        //put all attributes to given movie object
        movie.title = title;
        movie.imageUrl = imageUrl;
        movie.director = director;
        movie.producer = producer;
        movie.starring = starring;
        movie.music = music;
        movie.cinematography = cinematography;
        movie.editor = editor;
        movie.company = company;
        movie.distributed = distributed;
        movie.releaseDate = releaseDate;
        movie.runningTime = runningTime;
        movie.country = country;
        movie.language = language;
        movie.budget = budget;
        movie.boxOffice = boxOffice;

    } catch (error) {
        console.log(error);
    }
}

module.exports = gatherMovieInfo;