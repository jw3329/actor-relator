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
    // try catch for an api call
    try {
        const data = (await axios.get(url, {
            params
        })).data;

        // try catch for searching
        try {
            if (!data[1][0] || data[1][0].toLowerCase() !== search.toLowerCase()) throw new Error('No search found on wiki');
            let node = null;
            if (selected === 'Actor') {
                node = new Actor(data[3][0], data[1][0]);
                await gatherActorInfo(node);
                if (!node.occupation.includes(['Actor', 'Actress'])) throw new Error('The search is not an actor');
            } else if (selected == 'Movie') {
                node = new Movie(data[3][0], data[1][0]);
                await gatherMovieInfo(node);
                if (!node.director[0]) throw new Error('The search is not a movie');
            }
            res.send(await nodeBFS(node, limit));
        } catch (error) {
            res.status(400).send(error.message);
        }
    } catch (error) {
        res.status(404).send(error);
    }
}

module.exports = wikiSearch;