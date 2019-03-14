const getData = require('./get_data');

const nodeBFS = async (node, limit) => {
    const idSet = new Set();
    let count = 0;
    const nodeQueue = [];
    nodeQueue.push(node);
    count++;
    await getData(limit, idSet, nodeQueue, count);
    return node;
}

module.exports = nodeBFS;