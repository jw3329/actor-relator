const axios = require('axios');
const cheerio = require('cheerio');

const Actor = require('../node/actor');

const getElemInTable = ($, tr, text) => {
    return $(tr).find('th').filter((_, elem) => $(elem).text().trim() === text.trim());
}

const gatherMovieInfo = async movie => {
    try {
        let confirm = null;
        const url = movie.link;
        const wikiUrl = 'https://en.wikipedia.org';
        const html = (await axios.get(url)).data;
        const $ = cheerio.load(html);
        const infobox = $('.infobox');
        const tr = $(infobox).find('tr');
        // get all attributes to put into the movie object
        const title = $(tr).find('.summary').text().trim();
        confirm = $(tr).find('.image').find('img').attr('src');
        const imageUrl = confirm ? 'https:' + $(tr).find('.image').find('img').attr('src').trim() : null;
        const director = getElemInTable($, tr, 'Directed by').next().text().trim().split("\n");
        const producer = getElemInTable($, tr, 'Produced by').next().text().trim().split("\n");
        const starring = [];
        getElemInTable($, tr, 'Starring').next().find('li').each((_, li) => {
            const link = $(li).find('a').attr('href');
            link && starring.push(new Actor(wikiUrl + link));
        });
        const music = getElemInTable($, tr, 'Music by').next().text().trim().split("\n");
        const cinematography = getElemInTable($, tr, 'Cinematography').next().text().trim();
        const editor = getElemInTable($, tr, 'Edited by').next().text().trim().split("\n");
        confirm = getElemInTable($, tr, "Productioncompany").next().text().trim().match(/\w+(\s\w+)*/);
        const company = confirm ? confirm[0].split("\n") : null;
        confirm = getElemInTable($, tr, 'Distributed by').next().text().trim().match(/\w+(\s\w+)*/);
        const distributed = confirm ? confirm[0] : null;
        const releaseDate = getElemInTable($, tr, 'Release date').next().find('li').eq(0).find('.bday').text().trim();
        confirm = getElemInTable($, tr, 'Running time').next().text().trim().match(/^\d+/);
        const runningTime = confirm ? parseInt(confirm[0]) : null;
        confirm = getElemInTable($, tr, 'Country').next().text().trim().match(/^\d+/);
        const country = confirm ? confirm[0].split("\n") : null;
        const language = getElemInTable($, tr, 'Language').next().text().trim().split("\n");
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