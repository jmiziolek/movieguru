const express = require('express');
const http = require('http');
const bodyParser = require('body-parser')

const MongoClient = require('mongodb').MongoClient;

const MovieController = require('./controllers/MovieController');
const CommentsController = require('./controllers/CommentsController');

const OMDBFetcher = require('./OMDBFetcher');

let app = express();
app.server = http.createServer(app);

// Please don't abuse my test token but I don't care much.
let omdbToken = 'd4ebb3d2';
app.omdb = new OMDBFetcher(omdbToken);

app.close = async () => {
	app.server.close();
	await app.dbClient.close();
}

app.use(bodyParser.json());
app.use((req, res, next) => {
	// Disable CORS for test runner
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
  
app.get('/movies', MovieController.getAllMovies);
app.post('/movies', MovieController.getMovie)

app.get('/comments', CommentsController.getAllComments);
app.post('/comments', CommentsController.addComment);

startServer = () => {
	return new Promise(async (resolve, reject) => {
		let mongoHost = process.env.MONGODB || 'mongodb://localhost';
		let mongoDatabase = process.env.MONGODB_DATABASE || 'guru';
		client = await MongoClient.connect(mongoHost, { useNewUrlParser: true });
		app.dbClient = client;
		app.db = client.db(mongoDatabase);
	
		// Running by default on 444
		
		app.server.listen(process.env.PORT || 444, () => {
			console.log(`Started on port ${app.server.address().port}`);
			resolve(app);
		});	
	});
}

// Export startServer for test runner, or run the server if run via `node server.js`
if (require.main === module) {
	startServer();
}

module.exports = startServer;
