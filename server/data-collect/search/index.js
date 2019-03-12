const getActor = require('./get_actor');
const getMovie = require('./get_movie');

const actorMovieBFS = async (actor, limit) => {
    const idSet = new Set();
    let count = 0;
    const actorQueue = [];
    const movieQueue = [];
    actorQueue.push(actor);
    count++;
    await getActor(limit, idSet, actorQueue, movieQueue, count, getMovie, true);
    return actor;
}

module.exports = {
    actorMovieBFS
}