const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;
app.use(cors());

app.get('/', (req, res) => {
    require('./data-collect/search/wiki_search')(res, req.query);
});

app.listen(port, () => console.log(`Server started on port ${port}`));