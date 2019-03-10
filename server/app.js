const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

const gatherInfo = require('./data-collect/gather_info');

const axios = require('axios');

app.use(cors());

app.get('/', async (req, res) => {
    const url = "https://en.wikipedia.org/w/api.php";
    const searchName = req.query.name;
    const params = {
        action: 'opensearch',
        list: "search",
        search: searchName,
        format: "json",
        limit: 1,
        namespace: 0
    }
    try {
        const data = (await axios.get(url, {
            params
        })).data;
        if (data[1][0].toLowerCase() === searchName.toLowerCase()) {
            res.send(await gatherInfo.gatherActorInfo(data[3][0]));
        } else {
            res.send("Your search page '" + searchName + "' does not exists on English Wikipedia");
        }
    } catch (error) {
        res.send(error);
    }
});

app.listen(port, () => console.log(`Server started on port ${port}`));