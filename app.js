// dependencies
const express = require('express'),
request       = require('request'),
app           = express();

// variables
let query, url, data;

//configs
app.use(express.static('public'));
app.set('view engine', 'ejs');

// routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/results', (req, res) => {
    query = req.query.search;
    if (query === undefined) {
        res.redirect('/');
    } else {
        url = 'https://www.omdbapi.com/?apikey=1691f1b1&s=' + query; 
        request(url, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                data = JSON.parse(body);
                res.render('results', {data: data});
            }
        })
    }
});

// server
app.listen(process.env.PORT || 3500, process.env.IP, () => {
    console.log('server started');
});