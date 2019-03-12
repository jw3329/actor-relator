const express = require('express');
const cors = require('cors');
const axios = require('axios');

const gatherInfo = require('./data-collect/gather');
const { actorMovieBFS } = require('./data-collect/search');
const Actor = require('./node/actor');

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
            if (selected === 'Actor') {
                const actor = new Actor(data[3][0], data[1][0]);
                await gatherInfo.gatherActorInfo(actor);
                res.send(await actorMovieBFS(actor, limit));
            }
        } else {
            res.send("Your search page '" + search + "' does not exists on English Wikipedia");
        }
    } catch (error) {
        res.send(error);
    }
});

app.listen(port, () => console.log(`Server started on port ${port}`));