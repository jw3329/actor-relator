const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

const gatherInfo = require('./data-collect/');

const axios = require('axios');

app.use(cors());

const Actor = require('./node/actor');

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
            const actor = new Actor(data[3][0])
            await gatherInfo.gatherActorInfo(actor);
            const limit = 5;
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
    count++;
    while (actorQueue.length > 0 && count <= limit) {
        console.log('first');
        const actor = actorQueue.pop(0);
        if (actorSet.has(actor.link)) continue;
        actorSet.add(actor.link);
        for (const movie of actor.movies) {
            if (!movieSet.has(movie.link)) {
                try {
                    await gatherInfo.gatherMovieInfo(movie);
                    movieQueue.push(movie);
                    count++;
                } catch (error) {
                    console.log(error);
                }
            }
            console.log(actorQueue.length, movieQueue.length, count);
        }
        while (movieQueue.length > 0 && count <= limit) {
            const movie = movieQueue.pop(0);
            if (movieSet.has(movie.link)) continue;
            movieSet.add(movie.link);
            for (const actor of movie.starring) {
                if (!actorSet.has(actor.link)) {
                    try {
                        await gatherInfo.gatherActorInfo(actor);
                        actorQueue.push(actor);
                        count++;
                    } catch (error) {
                        console.log(error);
                    }
                }
                console.log(actorQueue.length, movieQueue.length, count);
            }
        }
        console.log('out of second');
    }
    return actor;
}

app.listen(port, () => console.log(`Server started on port ${port}`));