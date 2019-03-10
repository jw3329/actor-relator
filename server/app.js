const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

const gatherInfo = require('./data-collect/');

const axios = require('axios');

app.use(cors());

const Actor = require('./node/actor');
const Movie = require('./node/movie');

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
        if (data[1][0].toLowerCase() === searchName.toLowerCase()) {
            const actor = new Actor(data[3][0]);
            await gatherInfo.gatherActorInfo(actor);
            const limit = 100;
            res.send(await actorMovieBFS(actor, limit));
        } else {
            res.send("Your search page '" + searchName + "' does not exists on English Wikipedia");
        }
    } catch (error) {
        res.send(error);
    }
});

const actorMovieBFS = async (actor, limit) => {
    const actorSet = new Set();
    const movieSet = new Set();
    let count = 0;
    const actorQueue = [];
    const movieQueue = [];
    actorQueue.push(actor);
    while (actorQueue && count <= limit) {
        const actor = actorQueue.pop(0);
        actorSet.add(actor);
        count++;
        actor.movies.forEach(async movie => {
            await gatherInfo.gatherMovieInfo(movie);
            !movieSet.has(movie) && movieQueue.push(movie);
        });
        while (movieQueue && count <= limit) {
            const movie = movieQueue.pop(0);
            movieSet.add(movie);
            count++;
            movie.starring.forEach(async actor => {
                await gatherInfo.gatherActorInfo(actor);
                !actorSet.has(actor) && actorQueue.push(actor);
            });
        }
    }
    console.log(actor);
    return actor;
}

app.listen(port, () => console.log(`Server started on port ${port}`));