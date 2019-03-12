const gatherInfo = require('../gather');

const getMovie = async (limit, idSet, actorQueue, movieQueue, count, getActor, actorFlag) => {
    while (movieQueue.length > 0 && count <= limit) {
        const movie = movieQueue.pop(0);
        if (idSet.has(movie.id)) continue;
        idSet.add(movie.id);
        for (const actor of movie.starring) {
            if (!idSet.has(actor.id)) {
                try {
                    await gatherInfo.gatherActorInfo(actor, movie.title);
                    actorQueue.push(actor);
                    count++;
                } catch (error) {
                    console.log(error);
                }
            }
            console.log(actorQueue.length, movieQueue.length, count);
        }
        actorFlag && await getActor(limit, idSet, actorQueue, movieQueue, count, getMovie, false);
    }
}

module.exports = getMovie;