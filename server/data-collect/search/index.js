const getActor = require('./get_actor');
const getMovie = require('./get_movie');

const nodeBFS = async (node, limit) => {
    const idSet = new Set();
    let count = 0;
    const actorQueue = [];
    const movieQueue = [];
    node.actor ? actorQueue.push(node) : movieQueue.push(node);
    count++;
    node.actor
        ?
        await getActor(limit, idSet, actorQueue, movieQueue, count, getMovie, true)
        :
        await getMovie(limit, idSet, actorQueue, movieQueue, count, getActor, true)
    return node;
}

module.exports = nodeBFS;