const axios = require('axios');
const { gatherActorInfo, gatherMovieInfo } = require('../gather');
const nodeBFS = require('./');
const { Actor, Movie } = require('../../node');

const wikiSearch = async (res, { search, limit, selected }) => {
    const url = "https://en.wikipedia.org/w/api.php";
    const params = {
        action: 'opensearch',
        list: "search",
        search,
        format: "json",
        limit: 1,
        namespace: 0
    }
    try {
        const data = (await axios.get(url, {
            params
        })).data;
        if (data[1][0].toLowerCase() === search.toLowerCase()) {
            let node = null;
            if (selected === 'Actor') {
                node = new Actor(data[3][0], data[1][0]);
                console.log('here');
                await gatherActorInfo(node);
                console.log(node);
            } else if (selected == 'Movie') {
                node = new Movie(data[3][0], data[1][0]);
                await gatherMovieInfo(node);
            }
            res.send(await nodeBFS(node, limit));
        } else {
            res.status(400);
        }
    } catch (error) {
        res.status(404);
        res.send(error);
    }
}

module.exports = wikiSearch;