const gatherInfo = require('../gather');

const getData = async (limit, idSet, nodeQueue, count) => {
    while (nodeQueue.length > 0 && count <= limit) {
        const node = nodeQueue.pop(0);
        idSet.add(node.id);
        const nodeList = node.actor ? node.movies : node.starring;
        for (const data of nodeList) {
            if (count > limit) break;
            if (!idSet.has(data.id)) {
                try {
                    data.actor ? await gatherInfo.gatherActorInfo(data, node.title) : await gatherInfo.gatherMovieInfo(data, node.name);
                    nodeQueue.push(data);
                    count++;
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
}

module.exports = getData;