const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

const axios = require('axios');
const cheerio = require('cheerio');

app.use(cors());

app.get('/', async (req, res) => {
    const url = "https://en.wikipedia.org/w/api.php";
    const searchName = req.query.name;
    const params = {
        action: 'opensearch',
        list: "search",
        search: searchName,
        format: "json",
        limit: 1,
        namespace: 0
    }
    try {
        const data = (await axios.get(url, {
            params
        })).data;
        if (data[1][0] === searchName) {
            res.send(await gatherActorInfo(data[3][0]));
        } else {
            res.send("Your search page '" + searchName + "' does not exists on English Wikipedia");
        }
    } catch (error) {
        res.send(error);
    }
});

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
        console.log(allegiance);
        const filmList = $('.div-col.columns.column-width');
        const movie = [];
        const li = $(filmList).find('ul').children('li');
        const wikiUrl = 'https://en.wikipedia.org';
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

app.listen(port, () => console.log(`Server started on port ${port}`));