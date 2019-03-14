const Node = require('./node');

class Actor extends Node {
    constructor(link, name, imageUrl, bday, occupation, allegiance, movies) {
        super(link, true);
        this.name = name;
        this.imageUrl = imageUrl;
        this.bday = bday;
        this.occupation = occupation;
        this.allegiance = allegiance;
        this.movies = movies;
    }
}

module.exports = Actor;