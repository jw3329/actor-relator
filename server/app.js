const express = require('express');
const cors = require('cors');
const axios = require('axios');

const gatherInfo = require('./data-collect/gather');
const nodeBFS = require('./data-collect/search');
const { Actor, Movie } = require('./node');

const app = express();
const port = 8080;

app.use(cors());

app.get('/', async (req, res) => {
    const url = "https://en.wikipedia.org/w/api.php";
    const search = req.query.search;
    const limit = req.query.limit;
    const selected = req.query.selected;
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
                await gatherInfo.gatherActorInfo(node);
            } else if (selected == 'Movie') {
                node = new Movie(data[3][0], data[1][0]);
                await gatherInfo.gatherMovieInfo(node);
                console.log(node);
            }
            res.send(await nodeBFS(node, limit));
        } else {
            res.send("Your search page '" + search + "' does not exists on English Wikipedia");
        }
    } catch (error) {
        res.send(error);
    }
});

app.listen(port, () => console.log(`Server started on port ${port}`));