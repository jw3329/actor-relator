const gatherInfo = require('../gather');

const getActor = async (limit, idSet, actorQueue, movieQueue, count, getMovie, movieFlag) => {
    while (actorQueue.length > 0 && count <= limit) {
        const actor = actorQueue.pop(0);
        console.log(actor.name);
        if (idSet.has(actor.id)) continue;
        idSet.add(actor.id);
        for (const movie of actor.movies) {
            if (!idSet.has(movie.id)) {
                try {
                    await gatherInfo.gatherMovieInfo(movie, actor.name);
                    movieQueue.push(movie);
                    count++;
                } catch (error) {
                    console.log(error);
                }
            }
            console.log(actorQueue.length, movieQueue.length, count);
        }
        movieFlag && await getMovie(limit, idSet, actorQueue, movieQueue, count, getActor, false);
    }
}

module.exports = getActor;