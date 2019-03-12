const uuidv4 = require('uuid/v4');

class Node {
    constructor(link, actor) {
        this.id = uuidv4();
        this.link = link;
        this.actor = actor;
    }
}

module.exports = Node;