let express = require('express'), request = require('request');
let app = express();

app.use(express.static('public'));
// app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/results', function(req, res) {
    let query = req.query.search;
    if (query === undefined) {
        res.redirect('/');
    } else {
        let url = 'https://www.omdbapi.com/?apikey=1691f1b1&s=' + query; 
        request(url, function(error, response, body){
            if (!error && response.statusCode === 200) {
                let data = JSON.parse(body);
                res.render('results', {data: data});
            }
        })
    }
});

// app.listen(3500, function() {
//     console.log('server started on port 3500');
// });

app.listen(process.env.PORT, process.env.IP, function() {
    console.log('server started');
});