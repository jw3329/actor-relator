import vis from 'vis';

const getNodeEdgeLists = data => {
    const nodeList = [];
    const edgeList = [];
    const actorQueue = [];
    const movieQueue = [];
    const dataQueue = [];
    const idSet = new Set();
    dataQueue.push(data);
    // BFS way of forming node and edge
    while (dataQueue.length > 0) {
        const dataNode = dataQueue.pop(0);
        if (idSet.has(dataNode.id)) continue;
        idSet.add(dataNode.id);
        nodeList.push({
            id: dataNode.id,
            label: dataNode.actor ? dataNode.name : dataNode.title,
            group: dataNode.actor ? 'actor' : 'movie',
            font: {
                color: 'white'
            },
            link: dataNode.link
        });
        const list = dataNode.actor ? dataNode.movies : dataNode.starring;
        list && list.forEach(elem => {
            dataQueue.push(elem);
            edgeList.push({
                from: dataNode.id,
                to: elem.id
            });
        });
        // while (movieQueue.length > 0) {
        //     const movieNode = movieQueue.pop(0);
        //     if (idSet.has(movieNode.id)) continue;
        //     idSet.add(movieNode.id);
        //     nodeList.push({
        //         id: movieNode.id,
        //         label: movieNode.title,
        //         group: 'movie',
        //         font: {
        //             color: 'white'
        //         },
        //         link: movieNode.link
        //     });
        //     movieNode.starring && movieNode.starring.forEach(actor => {
        //         actorQueue.push(actor);
        //         edgeList.push({
        //             from: movieNode.id,
        //             to: actor.id
        //         });
        //     });
        // }
    }
    return [nodeList, edgeList];
}

export const visualize = async (data, { setSpinner, setNetwork }) => {
    const [nodeList, edgeList] = getNodeEdgeLists(data);
    const nodes = new vis.DataSet(nodeList);
    const edges = new vis.DataSet(edgeList);
    const container = document.getElementById('network');
    const networkData = { nodes, edges }
    const options = {
        layout: {
            improvedLayout: false
        },
        groups: {
            actor: {
                shape: 'oval',
                color: 'green'
            },
            movie: {
                shape: 'oval',
                color: 'blue'
            }
        }
    }
    setSpinner(false);
    const network = new vis.Network(container, networkData, options);
    network.on('click', obj => {
        nodes.get(obj.nodes[0]).link && window.open(nodes.get(obj.nodes[0]).link).focus();
    })
    setNetwork(network);
}