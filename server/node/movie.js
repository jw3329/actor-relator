const Node = require('./node');

class Movie extends Node {
    constructor(
        link,
        title,
        // imageUrl,
        // director,
        // producer,
        starring,
        // music,
        // cinematography,
        // editor,
        // company,
        // distributed,
        // releaseDate,
        // runningTime,
        // country,
        // language,
        // budget,
        // boxOffice
    ) {
        super(link, false);
        this.title = title;
        // this.imageUrl = imageUrl;
        // this.director = director;
        // this.producer = producer;
        this.starring = starring;
        // this.music = music;
        // this.cinematography = cinematography;
        // this.editor = editor;
        // this.company = company;
        // this.distributed = distributed;
        // this.releaseDate = releaseDate;
        // this.runningTime = runningTime;
        // this.country = country;
        // this.language = language;
        // this.budget = budget;
        // this.boxOffice = boxOffice;
    }
}

module.exports = Movie;